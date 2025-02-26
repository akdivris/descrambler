import React, { useState, useEffect } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { scrambleWord, isValidWord } from '../utils/wordUtils'
import { calculateScore } from '../utils/scoreUtils'

const INITIAL_TIME = 60

function Game() {
  const [letters, setLetters] = useState([])
  const [userInput, setUserInput] = useState('')
  const [foundWords, setFoundWords] = useState(new Set())
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)

  const wordList = [
    'PYTHON', 'JAVASCRIPT', 'REACT', 'CODING', 'DEVELOPER',
    'WEBSITE', 'PROGRAM', 'COMPUTER', 'ALGORITHM'
  ]

  useEffect(() => {
    startNewGame()
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const startNewGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setLetters(scrambleWord(randomWord).split(''))
    setFoundWords(new Set())
    setScore(0)
    setTimeLeft(INITIAL_TIME)
    setUserInput('')
    setFeedback('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const word = userInput.toUpperCase()

    if (foundWords.has(word)) {
      setFeedback('Word already found!')
      return
    }

    if (await isValidWord(word)) {
      const wordScore = calculateScore(word)
      setScore(s => s + wordScore)
      setFoundWords(prev => new Set([...prev, word]))
      setFeedback(`+${wordScore} points!`)
      setUserInput('')
    } else {
      setFeedback('Not a valid word!')
    }
  }

  return (
    <div className="text-center">
      <h2 className="mb-4">Score: {score}</h2>
      <h3>Time Left: {timeLeft}s</h3>
      
      <div className="letters-container mb-4">
        {letters.map((letter, i) => (
          <span key={i} className="letter-tile">{letter}</span>
        ))}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.toUpperCase())}
            placeholder="Type your word"
            className="word-input"
            disabled={timeLeft === 0}
          />
        </Form.Group>

        {feedback && (
          <Alert variant={feedback.includes('+') ? 'success' : 'danger'}>
            {feedback}
          </Alert>
        )}

        <Button 
          variant="primary" 
          type="submit" 
          className="me-2"
          disabled={timeLeft === 0}
        >
          Submit Word
        </Button>
        <Button 
          variant="secondary" 
          onClick={startNewGame}
        >
          New Game
        </Button>
      </Form>

      <div className="mt-4">
        <h4>Found Words:</h4>
        <div className="found-words">
          {Array.from(foundWords).join(', ')}
        </div>
      </div>
    </div>
  )
}

export default Game
