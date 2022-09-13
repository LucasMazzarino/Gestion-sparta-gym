import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';



function Navegacion() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">SPARTA GYM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Link className="nav-link" to='/'>INICIO</Link>
            <Link className="nav-link" to='/Cursos'>CURSOS</Link>
            <Link className="nav-link" to='/Noticias'>NOTICIAS</Link>
            <Link className="nav-link" to='/Contacto'>CONTACTO</Link>
            <Link className="nav-link" to='/Galeria'>GALERIA</Link>    
          </Nav>
        <Button variant="outline-success">Iniciar Sesion</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;