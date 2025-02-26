import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function Instructions({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>How to Play Descrambler</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Game Rules:</h5>
        <ul>
          <li>Form as many words as possible using the given letters</li>
          <li>Words must be at least 3 letters long</li>
          <li>Each letter can only be used once per word</li>
          <li>You have 60 seconds per round</li>
        </ul>

        <h5>Scoring:</h5>
        <ul>
          <li>3 letters: 100 points</li>
          <li>4 letters: 200 points</li>
          <li>5 letters: 400 points</li>
          <li>6+ letters: 800 points</li>
          <li>Bonus points for trending words!</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Let's Play!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Instructions
