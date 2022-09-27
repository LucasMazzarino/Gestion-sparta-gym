import React from 'react';
import Layout from '../../hocs/Layout';
import ListGroup from 'react-bootstrap/ListGroup';

import { connect } from "react-redux";
import { load_user } from '../../redux/actions/auth';

import { useEffect } from 'react';

const ReservaHorarios = ({
  cursos_horarios,
  load_user,
}) => {

  useEffect(() =>{
    load_user()
    window.scrollTo(0,0);
  },[])

  const listarMisCursos = () =>{
    if(cursos_horarios &&
      cursos_horarios !== null && 
      cursos_horarios !== undefined && 
      cursos_horarios.length !==0)
      {
        return(cursos_horarios.map(mis_cursos => {
          return(
            <div key={mis_cursos.id}>
              <div>{mis_cursos.nombre}</div>
              <div> {listarHorarios()}</div>
            </div>
          )
      }))   
    }    
  }

  const listarHorarios = () => {
    if(cursos_horarios.horarios && cursos_horarios.horarios !== null && cursos_horarios.horarios !== undefined && cursos_horarios.horarios.length !==0){
      console.log(cursos_horarios.horarios)
      console.log(cursos_horarios.horarios)
      return(
        cursos_horarios.horarios.map((horarios) => {
          return (         
            <ListGroup key={horarios.id} horizontal={'md'} className="my-2">
              <ListGroup.Item>{horarios.dia}</ListGroup.Item>
              <ListGroup.Item>{horarios.horario.horaInicio}</ListGroup.Item>
              <ListGroup.Item>{horarios.horario.horaFin}</ListGroup.Item> 
            </ListGroup>
          )         
        })
      )
    }  
  }
  return(
    <Layout>
    <section className='Reservas'>
        <h1>Reserva de horarios</h1>
        <div> hola tus cursos son :
         <ul>{listarMisCursos()}</ul>
         <div> reserva tu horario</div>
         </div>
    </section>
    </Layout>
)

}

const mapStateToProps = state => ({
  cursos_horarios: state.Auth.user.cursos,
})

export default connect(mapStateToProps, {
  load_user
}) (ReservaHorarios)
