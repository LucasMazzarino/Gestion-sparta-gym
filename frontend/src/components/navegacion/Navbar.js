import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Alert from '../alert'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router'

import { logout } from '../../redux/actions/auth'

import { connect } from 'react-redux'
import { Fragment, useState } from 'react'


function Navegacion({
  isAuthenticated,
  logout,
  staff,
}) {

  const [redirect, setRedirect] = useState(false);

  const logoutHandler = () => {
    logout()
    setRedirect(true);
  }

  if (redirect){
    window.location.reload(false)
    return <Navigate to='/' />;
  }

  

  const isStafflinks = (
    <Fragment>
        <button> eres administrador!!</button> 
    </Fragment>
  )
  
  const isNoStafflinks = (
    <Fragment>
        <button> no eres administrador</button> 
    </Fragment>
  )
  
  const authenticatedLinks = (
    <Fragment>
    <button> Estas autenticado</button> 
    <button
    onClick={logoutHandler}
    > Cerrar seccion</button>
      <Fragment>
        {
          staff ? isStafflinks: isNoStafflinks
        }
      </Fragment>
    </Fragment>
  )

   const noAuthenticatedLinks = (
    <Fragment>
      <div className="flex item-center" variant="outline-success">
          <Link to="/login" className="btn btn-primary text-center">
            Iniciar Sesion
          </Link>
        </div>
    </Fragment>
  )

  return (
    <>
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
          {
            isAuthenticated ? authenticatedLinks: noAuthenticatedLinks
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Alert/>
    </>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  staff: state.Auth.staff
})

export default connect(mapStateToProps,{
  logout,
}) (Navegacion)
