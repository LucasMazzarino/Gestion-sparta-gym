import Layout from '../../hocs/Layout';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';

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
      reservas.length !==0)
      {
        return (reservas.map((reserva) => { 
          return(
          <div key={reserva.curso_horario.id}>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{reserva.curso_horario.curso.nombre}</Accordion.Header>
                  <Accordion.Body>
                       {reserva.curso_horario.dia} de {reserva.curso_horario.horario.horaInicio} a {reserva.curso_horario.horario.horaFin}
                      <Button variant="danger" onClick={()=>borrarReserva(reserva.id)}>Eliminar reserva</Button>
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
          <div className='row'>
                <div className='col-12 col-md-2'>

                </div>
                <div className='col-12 col-md-3 d-flex aling-items-center justify-content-center'>                    
                     <div className='cursosUsuario'>
                        <h3>Tus cursos:</h3>
                        <div> {listarMiscursos()}</div>                    
                    </div>
                </div>
                <div className='col-12 col-md-2'>

                </div>
                <div className='col-12 col-md-3 d-flex aling-items-center justify-content-center'> 
                      <div className='reservaUsuario'>
                        <h3>Tus reservas:</h3>
                        <div>{listarMisReservas()}</div> 
                      </div>                      
                </div>
                <div className='col-12 col-md-2'>

                </div>
          </div>              
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
