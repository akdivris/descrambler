export function scrambleWord(word) {
  const letters = word.split('')
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[letters[i], letters[j]] = [letters[j], letters[i]]
  }
  return letters.join('')
}

export async function isValidWord(word) {
  // For demo purposes, we'll use a simple check
  // In production, you'd want to use a dictionary API
  if (word.length < 3) return false
  
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    return response.ok
  } catch (error) {
    console.error('Error validating word:', error)
    return false
  }
}
