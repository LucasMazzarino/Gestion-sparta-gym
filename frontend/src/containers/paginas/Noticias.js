import React from 'react';
import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';

import { get_noticias } from '../../redux/actions/noticias';

import { useEffect } from 'react';
import { connect } from 'react-redux';

const Noticias = ({
	get_noticias,
	noticias
}) => {

	useEffect(() => {
		get_noticias()
	}, [])


	const mostrarNoticias = () =>{
		return(
			noticias &&
			noticias !== null &&
			noticias !== undefined &&
			noticias.length !==0 &&
			noticias.map((noticia) => {   
				return(
					<CardGroup key={noticia.id}>
						<Card className="bg-dark text-white" key={noticia.key}>
							<Card.Img variant="top" src={noticia.imagen} />
							<Card.Body>
								<Card.Title>{noticia.titulo}</Card.Title>
								<Card.Text>
								{noticia.descripcion}
								</Card.Text>
							</Card.Body>
						</Card>
					</CardGroup>
				)               
			})  
		)
	}
	
	return (
		<Layout>
			<section className='Noticias'>
				<h1>Noticias</h1>
				<Container>
				<Row md={1}>
					{mostrarNoticias()}
				</Row>
				</Container>
			</section>
		</Layout>
	)
}

const mapStateToProps = state => ({
	noticias: state.Noticias.noticias,
})

export default connect(mapStateToProps,{
	get_noticias,
}) (Noticias)