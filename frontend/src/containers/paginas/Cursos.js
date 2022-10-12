import React from 'react';
import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Parse from 'html-react-parser'


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
	},[])

	const mostrarCursos = () =>{
		return(
			cursos &&
			cursos !== null &&
			cursos !== undefined &&
			cursos.length !==0 &&
			cursos.map((curso) => {      
				return(
					<section key={curso.id} className='CartasCursos'>
						<CardGroup key={curso.id}>
							<Card className="bg-dark text-white">
								<div className='Carta'>
									<Card.Img variant="top" src={curso.imagen} className='ImagenCarta'/>
								</div>						
								<Card.Body>
									<Card.Title className='CardTitle'>{curso.nombre}</Card.Title>
									<Card.Text className='TextoCarta'>{Parse(curso.descripcion)}</Card.Text>									
								</Card.Body>
								<Card.Footer>
									<Link to={`${curso.id}`} variant="primary">Detalles del curso</Link>
								</Card.Footer>
							</Card>
						</CardGroup>
					</section>					
				)               
			})  
		)
	}

	return(
			<Layout>
			<section className='Cursos'>
					<h1>Nuestros Cursos</h1>
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