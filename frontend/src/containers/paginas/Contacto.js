import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Layout from '../../hocs/Layout';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Contacto(){
  return(
    <Layout>
    <Container className='Contacto'>      
                <h1>Contacto</h1>
                <Row>                                  
                  <Col xs={12} md={6}>
                      <p className='ParrafoContactoUno'>Te responderemos dentro de las 24 horas.</p>                         
                      <p className='ParrafoContactoDos'>Email: spartagyym@gmail.com<br></br>
                        Whatsapp: +598 098 34 02 64<br></br>
                        Dirección: Agraciada 1664, Salto, Uruguay</p>          
                  </Col>
                  <Col  xs={12} md={6}>
                      <p className='ParrafoContactoUno'>Deja tu información y te contactaremos muy pronto</p>                      
                      <Form action="https://formsubmit.co/tiagosilva_93@hotmail.es" method="POST" >
                          <Form.Group className="mb-3" controlId="Nombre">                            
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="input" name='Nombre' required/>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Email">                            
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control type="email" placeholder="email@gmail.com" name='E-Mail' required />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Mensaje1">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control as="textarea" rows={3} name='Consulta' required/>
                          </Form.Group>
                          <Button type='submit' variant="dark">Enviar</Button>
                          <Form.Control type="hidden" name='_next' value='http://localhost:3000/Contacto'/>
                          <Form.Control type="hidden" name='_captcha' value='false'/>
                       </Form>                                         
                  </Col>                               
                </Row>           
    </Container>
    </Layout>
  );
}

export default Contacto;