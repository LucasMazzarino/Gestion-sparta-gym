import Layout from "../../hocs/Layout"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


import { useParams } from "react-router-dom";
import { Fragment, useEffect,} from "react";
import { connect } from "react-redux";

import { get_curso } from "../../redux/actions/cursos";

const CursoDetail = ({
  get_curso,
  curso,
}) => {
  const params = useParams()
  const cursoId = params.cursoId

  useEffect(() =>{
    get_curso(cursoId)
  }, [])

  const mostrarHorario = () => {
    if(curso.horarios && curso.horarios !== null && curso.horarios !== undefined && curso.horarios.length !==0){
      console.log(curso.horarios)
      return(
        curso.horarios.map((horario) => {
          return (         
            <ListGroup key={horario.id} horizontal={'md'} className="my-2">
              <ListGroup.Item>Día: {horario.dia} - Comienza a las {horario.horario.horaInicio} y finaliza a las {horario.horario.horaFin}</ListGroup.Item>                                     
            </ListGroup>
          )         
        })
      )
    }
    return <div> No se encontraron horarios {curso.horarios.dia}</div>  
  }
 

  const mostrarDetail = () =>{
    if( curso && curso !== null && curso !== undefined && curso.length !==0 )	
      return(	      
        <Card key={curso.id} className="bg-dark text-white">
          <div className="Carta">
            <Card.Img variant="top" src={curso.imagen} className='ImagenCarta' />
          </div>         
          <Card.Body>
            <Card.Title className='CardTitle'>{curso.nombre}</Card.Title>
            <Card.Text className='CardText'>{curso.descripcion}</Card.Text>
          </Card.Body>
          <Card.Footer> {mostrarHorario()}</Card.Footer>             
        </Card>        	  
      )
      return( 
          <Fragment>No se encontro el Detalle del Curso</Fragment>
        )
      }
  
  return(
    <Layout>
			<section className='Detalle'>
					<h1>Detalle del Curso</h1>
					<Container>
					<Row md={2}>  
					{mostrarDetail()}
      		</Row>       
					</Container>
			</section>
			</Layout>
  )
} 



const mapStateToProps = state => ({
  curso: state.Cursos.curso,
})

export default connect(mapStateToProps, {
  get_curso,
}) (CursoDetail)

