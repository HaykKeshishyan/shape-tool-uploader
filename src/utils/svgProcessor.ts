import { JSDOM } from 'jsdom'

interface SvgDimensions {
  width: number
  height: number
  aspectRatio: number
}

interface ProcessResult {
  content: string
  iconCount: number
  sizeCount: number
}

// Armenian to Latin transliteration map
const ARMENIAN_TO_LATIN: { [key: string]: string } = {
  // Uppercase
  'Ա': 'A', 'Բ': 'B', 'Գ': 'G', 'Դ': 'D', 'Ե': 'E', 'Զ': 'Z', 'Է': 'E',
  'Ը': 'Y', 'Թ': 'T', 'Ժ': 'Zh', 'Ի': 'I', 'Լ': 'L', 'Խ': 'Kh', 'Ծ': 'Ts',
  'Կ': 'K', 'Հ': 'H', 'Ձ': 'Dz', 'Ղ': 'Gh', 'Ճ': 'Ch', 'Մ': 'M', 'Յ': 'Y',
  'Ն': 'N', 'Շ': 'Sh', 'Ո': 'O', 'Չ': 'Ch', 'Պ': 'P', 'Ջ': 'J', 'Ռ': 'R',
  'Ս': 'S', 'Վ': 'V', 'Տ': 'T', 'Ր': 'R', 'Ց': 'Ts', 'Ու': 'U', 'Փ': 'P',
  'Ք': 'Q', 'Օ': 'O', 'Ֆ': 'F',
  // Lowercase
  'ա': 'a', 'բ': 'b', 'գ': 'g', 'դ': 'd', 'ե': 'e', 'զ': 'z', 'է': 'e',
  'ը': 'y', 'թ': 't', 'ժ': 'zh', 'ի': 'i', 'լ': 'l', 'խ': 'kh', 'ծ': 'ts',
  'կ': 'k', 'հ': 'h', 'ձ': 'dz', 'ղ': 'gh', 'ճ': 'ch', 'մ': 'm', 'յ': 'y',
  'ն': 'n', 'շ': 'sh', 'ո': 'o', 'չ': 'ch', 'պ': 'p', 'ջ': 'j', 'ռ': 'r',
  'ս': 's', 'վ': 'v', 'տ': 't', 'ր': 'r', 'ց': 'ts', 'ու': 'u', 'փ': 'p',
  'ք': 'q', 'օ': 'o', 'ֆ': 'f', 'ւ': 'w', 'և': 'ev'
}

// Cyrillic to Latin transliteration map
const CYRILLIC_TO_LATIN: { [key: string]: string } = {
  // Russian uppercase
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
  'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
  'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
  'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '',
  'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
  // Russian lowercase
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '',
  'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
}

/**
 * Custom transliteration function with proper Armenian and Cyrillic support
 */
function transliterateText(text: string): string {
  let result = ''
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    
    // Check for Armenian characters
    if (ARMENIAN_TO_LATIN[char]) {
      result += ARMENIAN_TO_LATIN[char]
    }
    // Check for Cyrillic characters
    else if (CYRILLIC_TO_LATIN[char]) {
      result += CYRILLIC_TO_LATIN[char]
    }
    // Keep Latin letters, numbers, and basic characters
    else if (/[a-zA-Z0-9]/.test(char)) {
      result += char
    }
    // Replace other characters with space
    else {
      result += ' '
    }
  }
  
  return result
}

/**
 * Convert filename to a valid constant name by transliterating non-Latin characters
 * Example: "aram khachatryan.svg" -> "ARAM_KHACHATRYAN_SVG"
 * Example: "Միսակ Մեծարենց.svg" -> "MISAK_METSARENTS_SVG"
 */
function fileNameToConstantName(fileName: string, index: number): string {
  // Remove .svg extension
  let baseName = fileName.replace(/\.svg$/i, '')
  
  // Transliterate to Latin characters using custom function
  const transliterated = transliterateText(baseName)
  
  // Sanitize: replace non-alphanumeric with underscores
  const sanitized = transliterated
    .trim()
    .replace(/\s+/g, '_')           // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9]+/g, '_') // Replace non-alphanumeric with underscores
    .replace(/_+/g, '_')            // Replace multiple underscores with single
    .replace(/^_+|_+$/g, '')        // Remove leading/trailing underscores
    .toUpperCase()
  
  // If we have a valid name after sanitization, use it
  if (sanitized && sanitized.length > 0) {
    return `${sanitized}_SVG`
  }
  
  // Otherwise, use index-based naming (shouldn't happen with transliteration)
  return `ICON_${index + 1}_SVG`
}

/**
 * Generate title from filename by transliterating non-Latin characters
 * Example: "aram khachatryan.svg" -> "Persons_aram_khachatryan"
 * Example: "Միսակ Մեծարենց.svg" -> "Persons_Misak_Metsarents"
 */
function generateTitleFromFilename(fileName: string, categoryName: string, index: number): string {
  // Remove .svg extension
  let baseName = fileName.replace(/\.svg$/i, '')
  
  // Transliterate to Latin characters using custom function
  const transliterated = transliterateText(baseName)
  
  // Replace spaces and special chars with underscores
  let sanitized = transliterated
    .trim()
    .replace(/\s+/g, '_')           // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9]+/g, '_') // Replace non-alphanumeric with underscores
    .replace(/_+/g, '_')            // Replace multiple underscores with single
    .replace(/^_+|_+$/g, '')        // Remove leading/trailing underscores
  
  // If sanitization results in empty string, use index (shouldn't happen)
  if (!sanitized || sanitized.length === 0) {
    sanitized = `icon_${index + 1}`
  }
  
  // Capitalize first letter of category
  const categoryCapitalized = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
  
  return `${categoryCapitalized}_${sanitized}`
}

/**
 * Extract or create title for SVG
 * Ensures SVG has a proper title tag that will be used as the key in sizes object
 */
function ensureSvgTitle(svgContent: string, fileName: string, categoryName: string, index: number): { 
  svgContent: string
  title: string 
} {
  const dom = new JSDOM(svgContent, { contentType: 'image/svg+xml' })
  const { document } = dom.window
  const svgElement = document.querySelector('svg')

  if (!svgElement) {
    throw new Error('Invalid SVG content')
  }

  let titleElement = svgElement.querySelector('title')
  let title: string

  if (titleElement && titleElement.textContent?.trim()) {
    // Title exists and has content, use it
    title = titleElement.textContent.trim()
  } else {
    // No title or empty title, generate one from filename
    title = generateTitleFromFilename(fileName, categoryName, index)
    
    if (titleElement) {
      // Update existing empty title
      titleElement.textContent = title
    } else {
      // Create new title element as first child of SVG
      titleElement = document.createElement('title')
      titleElement.textContent = title
      svgElement.insertBefore(titleElement, svgElement.firstChild)
    }
  }

  // Serialize back to string
  const updatedSvgContent = svgElement.outerHTML

  return {
    svgContent: updatedSvgContent,
    title: title
  }
}

/**
 * Calculate SVG dimensions using JSDOM (Node.js equivalent of browser DOM)
 * This is based on the getSvgChildrenDimensions function from your utils.js
 */
function getSvgChildrenDimensions(svgString: string): SvgDimensions {
  try {
    // Create a JSDOM instance
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)
    const { window } = dom
    const { document } = window

    // Parse the SVG
    const parser = new window.DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const svgElement = doc.querySelector('svg')

    if (!svgElement) {
      throw new Error('Invalid SVG string')
    }

    // Clone and append to body for measurements
    const tempSvg = svgElement.cloneNode(true) as SVGSVGElement
    document.body.appendChild(tempSvg)

    try {
      const visibleElements = tempSvg.querySelectorAll(
        'path, rect, circle, ellipse, line, polyline, polygon, text, g'
      )

      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity

      visibleElements.forEach((element) => {
        const fill = element.getAttribute('fill')
        const stroke = element.getAttribute('stroke')

        // Skip invisible elements
        if ((fill === 'none' || !fill) && (stroke === 'none' || !stroke)) {
          return
        }

        try {
          const bbox = (element as SVGGraphicsElement).getBBox()
          if (bbox.width > 0 && bbox.height > 0) {
            minX = Math.min(minX, bbox.x)
            minY = Math.min(minY, bbox.y)
            maxX = Math.max(maxX, bbox.x + bbox.width)
            maxY = Math.max(maxY, bbox.y + bbox.height)
          }
        } catch (e) {
          // Element doesn't support getBBox, skip it
        }
      })

      // Fallback to viewBox if no valid elements found
      if (minX === Infinity) {
        const viewBox = svgElement.getAttribute('viewBox')
        if (viewBox) {
          const [x, y, width, height] = viewBox.split(' ').map(Number)
          return {
            width: width,
            height: height,
            aspectRatio: width / height,
          }
        } else {
          return {
            width: 100,
            height: 100,
            aspectRatio: 1,
          }
        }
      }

      const actualWidth = maxX - minX
      const actualHeight = maxY - minY

      return {
        width: Math.round(actualWidth * 100) / 100,
        height: Math.round(actualHeight * 100) / 100,
        aspectRatio: Math.round((actualWidth / actualHeight) * 100) / 100,
      }
    } finally {
      // Clean up
      document.body.removeChild(tempSvg)
      window.close()
    }
  } catch (error) {
    console.error('Error calculating SVG dimensions:', error)
    // Return default dimensions on error
    return {
      width: 100,
      height: 100,
      aspectRatio: 1,
    }
  }
}

/**
 * Process multiple SVG files and generate a .jsx file with constants and sizes
 */
export async function processSvgFiles(
  files: Express.Multer.File[],
  categoryName: string
): Promise<ProcessResult> {
  const constants: { name: string; content: string; title: string }[] = []
  const sizes: { [key: string]: SvgDimensions } = {}

  // Process each file
  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    const originalSvgContent = file.buffer.toString('utf-8')
    
    // Ensure SVG has a proper title tag
    const { svgContent, title } = ensureSvgTitle(
      originalSvgContent, 
      file.originalname, 
      categoryName,
      index
    )
    
    const constantName = fileNameToConstantName(file.originalname, index)

    // Store the constant with updated SVG content (now includes proper title)
    constants.push({
      name: constantName,
      content: svgContent,
      title: title,
    })

    // Calculate dimensions
    console.log(`Processing ${file.originalname}...`)
    console.log(`  Constant: ${constantName}`)
    console.log(`  Title: ${title}`)
    const dimensions = getSvgChildrenDimensions(svgContent)
    console.log(`  Dimensions: ${dimensions.width} x ${dimensions.height}`)
    
    // Use the same title as key in sizes object
    sizes[title] = dimensions
  }

  // Generate the output file content
  const categoryUpper = categoryName.toUpperCase()
  const arrayName = `${categoryUpper}_ICONS`
  const sizesName = `${categoryName}Sizes`

  let output = '// Auto-generated file - Do not edit manually\n'
  output += `// Generated at: ${new Date().toISOString()}\n`
  output += `// Category: ${categoryName}\n`
  output += `// Total icons: ${constants.length}\n\n`

  // Add individual SVG constants
  constants.forEach(({ name, content }) => {
    output += `export const ${name} = \`\n${content}\`\n\n`
  })

  // Add array of all SVGs
  const constantNames = constants.map(c => c.name).join(', ')
  output += `export const ${arrayName} = [${constantNames}]\n\n`

  // Add sizes object
  output += `export const ${sizesName} = ${JSON.stringify(sizes, null, 2)}\n`

  return {
    content: output,
    iconCount: constants.length,
    sizeCount: Object.keys(sizes).length,
  }
}

