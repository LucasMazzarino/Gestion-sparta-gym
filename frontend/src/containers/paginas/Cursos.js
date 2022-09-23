import React from 'react';
import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';



import { get_cursos } from '../../redux/actions/cursos';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Cursos = ({
    get_cursos,
    cursos,
}) => {

	useEffect(() => {
			get_cursos()
			window.scrollTo(0,0)
	}, [])

	const mostrarCursos = () =>{
		return(
			cursos &&
			cursos !== null &&
			cursos !== undefined &&
			cursos.length !==0 &&
			cursos.map((curso) => {        
				return(
					<CardGroup key={curso.id}>
					<Card className="bg-dark text-white">
						<Card.Img variant="top" src={curso.imagen} />
						<Card.Body>
							<Card.Title>{curso.nombre}</Card.Title>
							<Card.Text>
							{curso.descripcion}
							</Card.Text>
						</Card.Body>
						<Card.Footer>
						<Link to={`${curso.id}`} variant="primary">Ver el Curso</Link>						</Card.Footer>
					</Card>
					</CardGroup>
				)               
			})  
		)
	}

	return(
			<Layout>
			<section className='Cursos'>
					<h1>Cursos</h1>
					<Container>
					<Row md={3}>
					{mostrarCursos()}
      		</Row>          
					</Container>
			</section>
			</Layout>
	)
}

const mapStateToProps = state => ({
    cursos: state.Cursos.cursos,
})

export default connect(mapStateToProps,{
    get_cursos,
}) (Cursos)