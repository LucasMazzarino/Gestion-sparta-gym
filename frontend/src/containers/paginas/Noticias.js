import React from 'react';
import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

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
							<Row className='col-12 col-md-6 justify-content-center' id='Noticia'>
								<Image className='imagenNoticia' src={noticia.imagen}/>							
								<h4>{noticia.titulo}</h4>								
								<p>{noticia.descripcion}</p>													
							</Row>											
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