import React from 'react';
import Layout from '../../hocs/Layout';
import ListGroup from 'react-bootstrap/ListGroup';

import { connect } from "react-redux";


import { useEffect } from 'react';
import { load_user } from '../../redux/actions/auth';

const ReservaHorarios = ({
  cursos_horarios,
  cursos_h,
  load_user
}) => {

  useEffect(() =>{
    load_user();
    window.scrollTo(0,0);
  },[])

 const listarMiscursos = () => {
   if(cursos_h &&
     cursos_h !== null && 
     cursos_h !== undefined && 
     cursos_h.length !==0)
     {
       return (cursos_h.map((cursos_horarios) => {      
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
           <div> {listarMiscursos()}</div> 
         <div> reserva tu horario</div>
         <div> </div>
         </div>
    </section>
    </Layout>
)

}

const mapStateToProps = state => ({
  cursos_h: state.Auth.cursos_usuario,
})

export default connect(mapStateToProps, {
  load_user
}) (ReservaHorarios)
