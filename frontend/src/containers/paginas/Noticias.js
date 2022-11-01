import React from 'react';
import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';

import Parse from 'html-react-parser'

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
						<Container className='seccionNoticias' key={noticia.id}>
							<Row key={noticia.autor} className='col-12 col-md-6 justify-content-center' id='Noticia'>
								<Image className='imagenNoticia' src={noticia.imagen}/>							
								<h4>{noticia.titulo}</h4>								
								<div>{Parse(noticia.descripcion)}</div>
								<span className='fechaPosteo'>publicado el: {noticia.publicado} por: {noticia.autor.nombre}</span>
								<Accordion defaultActiveKey="1">
									<Accordion.Item eventKey="0">
										<Accordion.Header>Seccion de comentarios</Accordion.Header>
										<Accordion.Body>
										</Accordion.Body>
									</Accordion.Item>								
   								 </Accordion>		 						
								<textarea placeholder='Realice un comentario'></textarea>																								
							</Row>																	
							<Button variant="dark" className='btn-comentar'>Comentar</Button>	
						</Container>
					)               
				})  
		)
	}
	
	return (
		<Layout>
				<h1>Blog de Noticias</h1>
				<Container className='allNoticias'>
					<Row md={1}>
						{mostrarNoticias()}
					</Row>
				</Container>
		</Layout>
	)
}

const mapStateToProps = state => ({
	noticias: state.Noticias.noticias,
})

export default connect(mapStateToProps,{
	get_noticias,
}) (Noticias)