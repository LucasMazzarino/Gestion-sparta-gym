import React from 'react';
import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';

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
			<div>{
				noticias &&
				noticias !== null &&
				noticias !== undefined &&
				noticias.length !==0 &&
				noticias.map((noticia) => {   
					return(
						<Container className='seccionNoticias' key={noticia.id}>
							<Row  key={noticia.id} className='col-12 col-md-6 justify-content-center' id='Noticia'>
								<Image className='imagenNoticia' src={noticia.imagen}/>							
								<h4>{noticia.titulo}</h4>								
								<p>{noticia.descripcion}</p>
								<span className='fechaPosteo'>Posted on: {noticia.publicado}</span><br></br><br></br>
								<Accordion defaultActiveKey="1">
									<Accordion.Item eventKey="0">
										<Accordion.Header>Seccion de comentarios</Accordion.Header>
										<Accordion.Body>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
										eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
										minim veniam, quis nostrud exercitation ullamco laboris nisi ut
										aliquip ex ea commodo consequat. Duis aute irure dolor in
										reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
										pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
										culpa qui officia deserunt mollit anim id est laborum.
										</Accordion.Body>
									</Accordion.Item>								
   								 </Accordion>	
								 <hr></hr>						
								<textarea placeholder='Realice un comentario'></textarea>																								
							</Row>		
							<Button variant="dark">Comentar</Button>
																	
						</Container>
					)               
				}) 
			}
		</div> 
		)
	}
	
	return (
		<Layout>
			<section className='Noticias'>
				<h1>Blog de Noticias</h1>
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