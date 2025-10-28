// Quick test to verify Armenian transliteration works correctly

const ARMENIAN_TO_LATIN = {
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

function transliterateText(text) {
  let result = ''
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    
    if (ARMENIAN_TO_LATIN[char]) {
      result += ARMENIAN_TO_LATIN[char]
    } else if (/[a-zA-Z0-9]/.test(char)) {
      result += char
    } else {
      result += ' '
    }
  }
  
  return result
}

// Test cases
const testCases = [
  'Միսակ Մեծարենց',
  'Հովհաննես Թումանյան',
  'Վահան Տերյան',
  'Աշոտ Էրկաթ'
]

console.log('Armenian Transliteration Test\n')
console.log('=' .repeat(60))

testCases.forEach(armenian => {
  const transliterated = transliterateText(armenian)
  const constantName = transliterated
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase()
  
  console.log(`\nOriginal:      ${armenian}`)
  console.log(`Transliterated: ${transliterated}`)
  console.log(`Constant name:  ${constantName}_SVG`)
})

console.log('\n' + '='.repeat(60))
console.log('\n✅ If you see readable names above, the transliteration works!')

