# Descrambler - Word Unscrambling Game

A console-themed word descrambling game where players form words from scrambled letters. Features multiple difficulty levels, trending words, and a scoring system.

## Features

- Three difficulty levels (Easy, Medium, Hard)
- Console-style interface with dark theme
- Level progression system
- Trending word bonuses
- Responsive design
- Letter rescrambling

## How to Play

1. Select a difficulty level:
   - EASY: 6-8 letter common words
   - MEDIUM: 8-10 letter moderate words
   - HARD: 10-12 letter complex words

2. Form valid English words using the scrambled letters:
   - Words must be at least 3 letters long
   - Each letter can only be used once
   - Click the ⟳ button to rescramble letters

3. Scoring:
   - 3 letters: 100 pts
   - 4 letters: 200 pts
   - 5 letters: 400 pts
   - 6+ letters: 800 pts
   - Trending words get bonus points
   - Points are multiplied by current level

## Development

The game is built with vanilla JavaScript and uses:
- Custom CSS for styling
- Fira Code font for the console aesthetic
- Dictionary API for word validation

## Local Development

1. Clone the repository
2. Run `npx http-server . -p 3000`
3. Open `http://localhost:3000` in your browser

## License

MIT License
