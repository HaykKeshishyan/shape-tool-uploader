# Shape Tool Uploader

A Node.js + TypeScript application for processing SVG files and generating React-compatible JSX files with automatically calculated dimensions.

## Features

- 📤 Upload multiple SVG files through a beautiful web interface
- 🎯 Automatic dimension calculation using the same logic as your ShapeToolEditor
- 🏷️ Auto-generates or ensures proper `<title>` tags in SVG files
- 🌍 **Automatic transliteration** - converts Armenian, Cyrillic, and other non-Latin characters to English
- 📦 Creates ready-to-use React constants with icon arrays
- 📊 Generates size objects matching the title keys in your SVGs

## Installation

```bash
# Install dependencies
npm install
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
# Build the project
npm run build

# Run the compiled version
npm start
```

### Using the Application

1. Open your browser and navigate to `http://localhost:8080`
2. Enter a category name (e.g., "persons", "military")
3. Select one or more SVG files
4. Click "Generate File"
5. Download the generated `.jsx` file

## Output Format

The application generates a `.jsx` file with the following structure:

### Example 1: Latin Characters
```javascript
// Auto-generated file - Do not edit manually
// Generated at: 2025-10-28T...
// Category: persons
// Total icons: 2

export const PERSON_ONE_SVG = `
<svg ...>
  <title>Persons_person_one</title>
  ...
</svg>
`

export const PERSON_TWO_SVG = `
<svg ...>
  <title>Persons_person_two</title>
  ...
</svg>
`

export const PERSONS_ICONS = [PERSON_ONE_SVG, PERSON_TWO_SVG]

export const personsSizes = {
  "Persons_person_one": {
    "width": 45.32,
    "height": 98.12,
    "aspectRatio": 0.46
  },
  "Persons_person_two": {
    "width": 52.18,
    "height": 99.34,
    "aspectRatio": 0.53
  }
}
```

### Example 2: Armenian/Non-Latin Characters (Transliterated)
```javascript
// If you upload "Միսակ Մեծարենց.svg" with category "persons":

export const MISAK_METSARENTS_SVG = `
<svg ...>
  <title>Persons_Misak_Metsarents</title>
  ...
</svg>
`

export const PERSONS_ICONS = [MISAK_METSARENTS_SVG]

export const personsSizes = {
  "Persons_Misak_Metsarents": {
    "width": 45.32,
    "height": 98.12,
    "aspectRatio": 0.46
  }
}
```

**Transliteration Examples:**
- Armenian: "Միսակ Մեծարենց" → "Misak Metsarents"
- Armenian: "Հովհաննես Թումանյան" → "Hovhannes Tumanyan"
- Russian: "Иван Петров" → "Ivan Petrov"
- Custom mappings ensure accurate, readable output!

## Project Structure

```
shape-tool-uploader/
├── src/
│   ├── server.ts              # Express server
│   ├── utils/
│   │   └── svgProcessor.ts    # SVG processing logic
│   └── public/
│       ├── index.html         # Web interface
│       └── styles.css         # Styling
├── output/                    # Generated files
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

- `POST /api/upload` - Upload SVG files and generate JSX
- `GET /api/download/:fileName` - Download generated file
- `GET /api/health` - Health check endpoint

## Technologies Used

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express** - Web framework
- **Multer** - File upload handling
- **JSDOM** - DOM manipulation in Node.js
- **CORS** - Cross-origin resource sharing

## Notes

- The dimension calculation uses the same `getSvgChildrenDimensions` logic from your existing project
- SVG titles are automatically generated from filenames if not present
- The title in the SVG matches the key in the sizes object for consistency
- Generated files are stored in the `output/` directory

## 🌐 Deployment

Want to share this tool with others? Deploy it for free!

### Quick Deploy to Render (Recommended)

1. **Push to GitHub**:
```bash
./deploy-to-render.sh
```

2. **Deploy on Render**:
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Click "Create Web Service" (all settings are pre-configured!)

3. **Share your link**: `https://your-app.onrender.com`

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions and other platforms.**

---

## 📦 Deployment Files Included

- ✅ `render.yaml` - One-click deploy for Render
- ✅ `Procfile` - For Heroku-compatible platforms
- ✅ `.env.example` - Environment variables template
- ✅ `deploy-to-render.sh` - Helper script for Git setup

---

## License

MIT

