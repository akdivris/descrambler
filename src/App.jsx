import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import Game from './components/Game'
import Instructions from './components/Instructions'

function App() {
  const [showInstructions, setShowInstructions] = React.useState(true)

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Descrambler</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => setShowInstructions(true)}>How to Play</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="game-container">
        <Game />
        <Instructions 
          show={showInstructions} 
          onHide={() => setShowInstructions(false)} 
        />
      </Container>
    </>
  )
}

export default App
