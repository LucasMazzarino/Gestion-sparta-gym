import React from 'react';
import ImagenUno from '../imagenes/ImagenUno.jfif'
import ImagenDos from '../imagenes/ImagenDos.jpg'
import ImagenTres from '../imagenes/ImagenTres.jpg'
import ImagenCuatro from '../imagenes/ImagenCuatro.jpg'
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'





function SeccionCuatro(){
  return(
    <section className='SeccionCuatro'>
        <div className='container'>
              <div className='row'>                    
                    <div className='col-md-12 d-flex aling-items-center justify-content-center'>
                        <p id='parrafoSeccionCuatro'>En <span id='parrafoSparta'>SPARTA GYM</span> ofrecemos un servicio de entrenamiento fisico personalizado.<br></br>
                            Pioneros en la modalidad de Smart Integral Training.                          
                        </p>                      
                    </div>  
                    <h1>Te estamos esperando ! ! !</h1>             
                </div>
                <br></br>
                <Container>
                <Row>
                    <Col md sm={12}><Image src={ImagenDos} rounded width='300' height='500' className='ImagenDos'/></Col>                 
                    <Col md sm={12}><Image src={ImagenTres} rounded width='300' height='500' className='ImagenTres'/></Col>                 
                    <Col md sm={12}><Image src={ImagenCuatro} rounded width='300' height='500' className='ImagenCuatro'/></Col>

                </Row>
                </Container>
                        
        </div>
     </section>
  );
}

export default SeccionCuatro;