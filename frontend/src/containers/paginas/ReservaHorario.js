import Layout from '../../hocs/Layout';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { connect } from "react-redux";
import { reservar_horario, get_reservas_horarios} from '../../redux/actions/reserva'


import { useEffect, useState } from 'react';

const ReservaHorarios = ({
  cursos_usuarios,
  usu_id,
  reservas,
  reservar_horario,
  get_reservas_horarios,
}) => {

  const [listar, setListar] = useState(false) 

  useEffect(() => { 
    get_reservas_horarios(usu_id)
  },[])

  const reservar = () => {
    get_reservas_horarios(usu_id)
    console.log('renderizando')
  }

  const onClick = (id) => {  
    reservar_horario(usu_id, id)
    setListar(true)
  }

  if (listar){
    reservar()
    setListar(false)
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
            <div>{cursos_horarios.nombre}</div>
              <div> {listarHorarios(cursos_horarios)}</div> 
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
              <ListGroup key={horarios.id} horizontal={'md'} className="my-2">
                <ListGroup.Item >{horarios.dia}</ListGroup.Item>
                <ListGroup.Item >{horarios.horario.horaInicio}</ListGroup.Item>
                <ListGroup.Item>{horarios.horario.horaFin}</ListGroup.Item> 
                <Button type="submit" variant="primary" onClick={()=>onClick(horarios.id)}>reservar horario</Button>
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
          console.log(reserva)     
          return(
          <div key={reserva.id}>
            <div>{reserva.curso.nombre} el {reserva.dia} de:</div>
            <div>{reserva.horario.horaInicio} a {reserva.horario.horaFin}</div>
              <Button>Eliminar mi reserva</Button> 
          </div>
          )
        }))
      } 
  }

  return(
    <Layout>
    <section className='Reservas'>
        <h1>Reserva de horarios</h1>
        <div> hola tus cursos son :
            <div> {listarMiscursos()}</div> 
          <div> reserva tu horario</div>
          </div>
    </section>
    <section>
      <h3>tus horarios son</h3>
      <div>{listarMisReservas()}</div>
    </section>
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
  get_reservas_horarios
}) (ReservaHorarios)
