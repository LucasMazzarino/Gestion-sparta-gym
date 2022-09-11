import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';



function Navegacion() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">SPARTA GYM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#Inicio">INICIO</Nav.Link>
            <Nav.Link href="#Cursos">CURSOS</Nav.Link>
            <Nav.Link href="#Noticias">NOTICIAS</Nav.Link>
            <Nav.Link href="#Contacto">CONTACTO</Nav.Link>
            <Nav.Link href="#Galeria">GALERIA</Nav.Link>     
          </Nav>
        <Button variant="outline-success">Iniciar Sesion</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;