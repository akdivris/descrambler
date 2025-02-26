export function calculateScore(word) {
  const length = word.length
  
  if (length < 3) return 0
  if (length === 3) return 100
  if (length === 4) return 200
  if (length === 5) return 400
  return 800 // 6+ letters
}

// You can add trending word bonus logic here
export function isTrendingWord(word) {
  // In production, this would check against a real trending words API
  const trendingWords = ['VIRAL', 'TREND', 'SOCIAL']
  return trendingWords.includes(word)
}
