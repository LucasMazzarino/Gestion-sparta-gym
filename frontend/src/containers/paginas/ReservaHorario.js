import React, { useState } from 'react';
import Layout from '../../hocs/Layout';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { connect } from "react-redux";
import { reservar_horario } from '../../redux/actions/reserva'


import { useEffect } from 'react';

const ReservaHorarios = ({
  cursos_usuarios,
  usu,
  reservar_horario
}) => {

  useEffect(() =>{ 
    window.scrollTo(0,0);
  },[])

  const onClick = (id) => {  
    reservar_horario(usu.id, id)
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
    if(cursos_horarios.horarios && cursos_horarios.horarios !== null && cursos_horarios.horarios !== undefined && cursos_horarios.horarios.length !==0){
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
  cursos_usuarios: state.Auth.cursos_usuario,
  usu: state.Auth.user
})

export default connect(mapStateToProps, {
  reservar_horario
}) (ReservaHorarios)
