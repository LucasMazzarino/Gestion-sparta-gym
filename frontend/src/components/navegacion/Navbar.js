import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Alert from '../alert';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router';

import { logout } from '../../redux/actions/auth';

import { connect } from 'react-redux';
import { Fragment, useState } from 'react';
import Logo from '../../imagenes/Sparta Logo.jfif';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Login from '../../containers/auth/Login';




function Navegacion({
  isAuthenticated,
  logout,
  staff,
}) {

  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logoutHandler = () => {
    logout()
    return <Navigate to='/' />;
  }
  //decidir como hacer esto
  // if (redirect){
  //   window.location.reload(false)
  //   return <Navigate to='/' />;
  // }


  const isStafflinks = (
    <Fragment>
        <span className='pBienvenidoAdministrador'>Bienvenido administrador!</span>
    </Fragment>
  )
  
  const isNoStafflinks = (
    <Fragment>
        <span className='pNoeresadmins'>Bienvenido usuario!</span>     
    </Fragment>
    
  )
  
  const authenticatedLinks = (
    <Fragment>
      <Link to="/reservas" className="btn btn-success text-center">
        Reserva tu horario
      </Link>
    <button onClick={logoutHandler} className="btn btn-link"> Cerrar sesión</button>
      <Fragment>{
          staff ? isStafflinks: isNoStafflinks
        }
      </Fragment>
    </Fragment>
  )

   const noAuthenticatedLinks = (
    <Fragment>
      <div className="flex item-center" variant="outline-success">
          <Button variant="primary" onClick={handleShow}>
           Iniciar sesión
          </Button>
          
          <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Inicie sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body><Login/></Modal.Body>               
          </Modal>
        </div>
    </Fragment>
  )


  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Link to='/'>
           <img src={Logo} width='70' height='50'></img>         
        </Link>
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
