import React from 'react';
import EntrenadorUno from '../imagenes/EntrenadorUno.jpg'
import EntrenadorDos from '../imagenes/EntrenadorDos.jpg'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



function SeccionTres(){
  return(
    <section className='SeccionTres'> 
              <h1>Nuestros entrenadores</h1>
              <Col className='text-center'>
              <p>En el gimnasio encontrarás entrenadores certificados siempre disponibles a ayudarte y a sacar lo mejor de ti!</p>
              <p>Sumate a nuestros entrenmianetos! Te esperamos!</p>
              </Col>
              <Container>
                  <Row className="justify-content-md-center">
                    <Col md="auto" className='text-center'><Image src={EntrenadorUno} rounded width='300' height='500'/></Col>                   
                    <Col md="auto" className='text-center'><Image src={EntrenadorDos} rounded width='300' height='500'/></Col>          
                  </Row>                 
               </Container>
    </section>
  );
}

export default SeccionTres;