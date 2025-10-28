import express, { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import { processSvgFiles } from './utils/svgProcessor'

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(cors())
app.use(express.json())

// Static files path - works in both development and production
// In production (dist/server.js), we need to go up one level to find src/public
const publicPath = path.join(__dirname, '..', 'src', 'public')
app.use(express.static(publicPath))

console.log(`📂 Serving static files from: ${publicPath}`)

// Ensure output directory exists
const outputDir = path.join(__dirname, '../output')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/svg+xml' || file.originalname.endsWith('.svg')) {
      cb(null, true)
    } else {
      cb(new Error('Only SVG files are allowed'))
    }
  },
})

// Upload endpoint
app.post('/api/upload', upload.array('svgFiles', 100), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]
    const categoryName = req.body.categoryName as string

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    if (!categoryName) {
      return res.status(400).json({ error: 'Category name is required' })
    }

    console.log(`Processing ${files.length} SVG files for category: ${categoryName}`)

    // Process the SVG files
    const result = await processSvgFiles(files, categoryName)

    // Save the generated file
    const outputFileName = `${categoryName}-svgs.jsx`
    const outputPath = path.join(outputDir, outputFileName)
    
    fs.writeFileSync(outputPath, result.content)

    console.log(`Generated file: ${outputFileName}`)
    console.log(`Total icons: ${result.iconCount}`)
    console.log(`Total sizes calculated: ${result.sizeCount}`)

    res.json({
      success: true,
      fileName: outputFileName,
      iconCount: result.iconCount,
      sizeCount: result.sizeCount,
      downloadUrl: `/api/download/${outputFileName}`,
      preview: result.content,
    })
  } catch (error) {
    console.error('Error processing SVG files:', error)
    res.status(500).json({ 
      error: 'Failed to process SVG files',
      details: error instanceof Error ? error.message : String(error)
    })
  }
})

// Download endpoint
app.get('/api/download/:fileName', (req: Request, res: Response) => {
  const fileName = req.params.fileName
  const filePath = path.join(outputDir, fileName)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }

  res.download(filePath)
})

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 SVG Processor server running at http://localhost:${PORT}`)
  console.log(`📁 Output directory: ${outputDir}`)
})

