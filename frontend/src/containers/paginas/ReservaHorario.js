import Layout from '../../hocs/Layout';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import { connect } from "react-redux";
import { reservar_horario, get_reservas_horarios, eliminar_reserva} from '../../redux/actions/reserva'


import { useEffect, useState } from 'react';

const ReservaHorarios = ({
  cursos_usuarios,
  usu_id,
  reservas,
  reservar_horario,
  get_reservas_horarios,
  eliminar_reserva
}) => {

  const [listar, setListar] = useState(false) 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => { 
    get_reservas_horarios(usu_id)
  },[])

  const reservar = () => {
    get_reservas_horarios(usu_id)
  }

  const onClick = (id) => {  
    reservar_horario(usu_id, id)
    setListar(true)
    window.scrollTo(0,0)
  }

  if (listar){
    reservar()
    setListar(false)
  };

  const borrarReserva = (id) => {
    eliminar_reserva(id)
    window.scrollTo(0,0)
    setListar(true)
    handleClose()
  }
  
  const listarMiscursos = () => {
    if(cursos_usuarios &&
      cursos_usuarios !== null && 
      cursos_usuarios !== undefined && 
      cursos_usuarios.length !==0)
      {
        return (cursos_usuarios.map((cursos_horarios) => {      
          return(
          <div key={cursos_horarios.id}>
            <div className='NombreCursoReserva'>{cursos_horarios.nombre}</div>
              <div>{listarHorarios(cursos_horarios)}</div> 
          </div>
          )
        }))
      }
    
  }

  const listarHorarios = (cursos_horarios) => {
    if(cursos_horarios.horarios && cursos_horarios.horarios !== null && cursos_horarios.horarios !== undefined && cursos_horarios.horarios.length !==0)
    {
      return(
        cursos_horarios.horarios.map((horarios) => {
          return (         
              <ListGroup key={horarios.id} className="my-2">
                <ListGroup.Item >Dia: {horarios.dia}</ListGroup.Item>
                <ListGroup.Item >Comienza a las: {horarios.horario.horaInicio}</ListGroup.Item>
                <ListGroup.Item>Finaliza a las: {horarios.horario.horaFin}</ListGroup.Item> 
                <Button type="submit" variant="info" onClick={()=>onClick(horarios.id)}>Reserva un cupo!</Button>
              </ListGroup>
          )  
        })
      )
    }  
  }

  const listarMisReservas = () => {
    if(reservas &&
      reservas !== null && 
      reservas !== undefined && 
      reservas.length !== 0)
      {
        return (reservas.map((reserva) => { 
          return(
          <div key={reserva.curso_horario.id}>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{reserva.curso_horario.curso.nombre}</Accordion.Header>
                  <Accordion.Body>
                       {reserva.curso_horario.dia} de {reserva.curso_horario.horario.horaInicio} a {reserva.curso_horario.horario.horaFin}<br></br>
                      <Button variant="danger" onClick={handleShow}>Eliminar reserva</Button>
                      <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                          <Modal.Title>Seguro que quiere cancelar su reserva?</Modal.Title>
                          </Modal.Header> 
                          <Modal.Footer><Button variant="danger" onClick={()=>borrarReserva(reserva.id)}>Eliminar reserva</Button>
                          <Button variant="primary" onClick={handleClose}>No</Button></Modal.Footer>               
                      </Modal>
                  </Accordion.Body>                
                </Accordion.Item>             
          </Accordion>
          </div>
          )
        }))
      } 
  }

  return(
    <Layout>
    <Container className='seccionReservas'>     
          <h1>Reserva de horarios</h1>
          <Row>              
                <Col md={5} sm={12}>                    
                     <div className='cursosUsuario'>
                        <h3>Tus cursos:</h3>
                        <div> {listarMiscursos()}</div>                    
                    </div>
                </Col>
                <Col md={2} sm={12}>          
                    
                </Col>                 
                <Col md={5} sm={12}> 
                      <div className='reservaUsuario'>
                        <h3>Tus reservas:</h3>
                        <div>{listarMisReservas()}</div> 
                      </div>                      
                </Col>
                
          </Row>              
    </Container>           
    </Layout>
)

}

const mapStateToProps = state => ({
  cursos_usuarios: state.Auth.cursos_usuario,
  usu_id: state.Auth.id,
  reservas: state.Reservas.reservas
})

export default connect(mapStateToProps, {
  reservar_horario,
  get_reservas_horarios,
  eliminar_reserva
}) (ReservaHorarios)
