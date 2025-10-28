# Automatic Transliteration Support

The Shape Tool Uploader automatically **transliterates** (converts) non-Latin filenames to English/Latin equivalents!

## How It Works

All filenames with non-Latin characters are automatically converted to readable English text:

### Armenian Examples
- `Միսակ Մեծարենց.svg` → `MISAK_METSARENTS_SVG`
- `Վահան Տերյան.svg` → `VAHAN_TERYAN_SVG`
- `Հովհաննես Թումանյան.svg` → `Hovhannes_T'umanyan_SVG`

### Cyrillic Examples
- `Иван Петров.svg` → `IVAN_PETROV_SVG`
- `Мария Иванова.svg` → `MARIYA_IVANOVA_SVG`

### Chinese Examples
- `李明.svg` → `LI_MING_SVG`
- `王芳.svg` → `WANG_FANG_SVG`

### Arabic Examples
- `محمد.svg` → `MHMD_SVG`

## Supported Character Sets

The transliteration library supports virtually all Unicode scripts:
- ✅ Armenian (Ա-Ֆ) → Latin equivalents
- ✅ Cyrillic (А-Я) → Latin equivalents
- ✅ Chinese (汉字) → Pinyin romanization
- ✅ Arabic (العربية) → Latin equivalents
- ✅ Greek (Ελληνικά) → Latin equivalents
- ✅ Hebrew (עברית) → Latin equivalents
- ✅ Thai, Japanese, Korean, and many more!

Spaces and special characters are converted to underscores.

## Examples

### Example 1: Armenian Files
**Input files:**
- `Միսակ Մեծարենց.svg`
- `Վահան Տերյան.svg`
- `Հովհաննես Թումանյան.svg`

**Output (persons-svgs.jsx):**
```javascript
export const MISAK_METSARENTS_SVG = `
<svg ...>
  <title>Persons_Misak_Metsarents</title>
  ...
</svg>
`

export const VAHAN_TERYAN_SVG = `
<svg ...>
  <title>Persons_Vahan_Teryan</title>
  ...
</svg>
`

export const HOVHANNES_T_UMANYAN_SVG = `
<svg ...>
  <title>Persons_Hovhannes_T_umanyan</title>
  ...
</svg>
`

export const PERSONS_ICONS = [MISAK_METSARENTS_SVG, VAHAN_TERYAN_SVG, HOVHANNES_T_UMANYAN_SVG]

export const personsSizes = {
  "Persons_Misak_Metsarents": { width: 45.32, height: 98.12, aspectRatio: 0.46 },
  "Persons_Vahan_Teryan": { width: 52.18, height: 99.34, aspectRatio: 0.53 },
  "Persons_Hovhannes_T_umanyan": { width: 48.75, height: 97.22, aspectRatio: 0.50 }
}
```

### Example 2: Mixed Languages
**Input files:**
- `john_doe.svg`
- `Միսակ Մեծարենց.svg`
- `Иван Петров.svg`

**Output:**
```javascript
export const JOHN_DOE_SVG = `
<svg ...><title>Persons_john_doe</title>...</svg>
`

export const MISAK_METSARENTS_SVG = `
<svg ...><title>Persons_Misak_Metsarents</title>...</svg>
`

export const IVAN_PETROV_SVG = `
<svg ...><title>Persons_Ivan_Petrov</title>...</svg>
`

export const PERSONS_ICONS = [JOHN_DOE_SVG, MISAK_METSARENTS_SVG, IVAN_PETROV_SVG]

export const personsSizes = {
  "Persons_john_doe": { width: 45.32, height: 98.12, aspectRatio: 0.46 },
  "Persons_Misak_Metsarents": { width: 52.18, height: 99.34, aspectRatio: 0.53 },
  "Persons_Ivan_Petrov": { width: 48.75, height: 97.22, aspectRatio: 0.50 }
}
```

## Benefits

1. **Fully Readable**: All names are converted to English/Latin characters
2. **JavaScript Compatible**: All export constants are valid JavaScript identifiers
3. **Consistent Naming**: Titles and size keys match the transliterated names
4. **No Information Loss**: Transliteration preserves pronunciation and readability
5. **Universal Support**: Works with any language/script

## Usage Tips

- All non-Latin characters are automatically transliterated to Latin equivalents
- Armenian "Միսակ" becomes "Misak", Cyrillic "Иван" becomes "Ivan"
- The `personsSizes` object keys will match the SVG `<title>` tags exactly
- You can mix files from different languages in the same upload
- The transliteration is automatic - no configuration needed!

