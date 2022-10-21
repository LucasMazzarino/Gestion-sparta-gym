import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Fragment, useState } from 'react';

import Alert from '../alert';
import { Link, Navigate, useLocation} from 'react-router-dom';

import { logout } from '../../redux/actions/auth';

import { connect } from 'react-redux';

import Logo from '../../imagenes/Sparta Logo.jfif';
import Login from '../../containers/auth/Login';




function Navegacion({
  isAuthenticated,
  logout,
  staff,
}) {

  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);

  const ubicacion = useLocation()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = () => {
    logout()
    setRedirect(true)
  }

  if (redirect && ubicacion.pathname !== '/'){
     return <Navigate to='/'/>;
  }


  const isStafflinks = (
    <Fragment>
        <span className='pBienvenidoAdministrador'>Bienvenido administrador!</span>
        <Link to="/estadisticas" id='estadis' className="btn btn-info text-center ">
        Ver estadisticas
        </Link>
    </Fragment>
  )
  
  const isNoStafflinks = (
    <Fragment>
        <span className='pNoeresadmins'>Bienvenido usuario!</span>
        <Link to="/reservas" className="btn btn-success text-center">
        Reserva tu horario
      </Link>  
    </Fragment>
    
  )
  
  const authenticatedLinks = (
    <Fragment>
      <Fragment>{
          staff ? isStafflinks: isNoStafflinks
        }
      </Fragment>
    <Button onClick={logoutHandler} className="btn-logout" variant='success'> Cerrar sesión</Button>    
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
           <img src={Logo} width='70' height='50' alt="Logo"></img>         
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
