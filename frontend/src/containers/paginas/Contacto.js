import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Layout from '../../hocs/Layout';
import Container from 'react-bootstrap/Container'


function Contacto(){
  return(
    <Layout>
    <Container className='Contacto'>          
                <div className='row'>
                  <h1>Contacto</h1>                
                  <div className='col-12 col-md-1'>
                                          
                  </div>
                  <div className='col-12 col-md-5'>
                      <p className='ParrafoContactoUno'>Te responderemos dentro de las 24 horas.</p>                         
                      <p className='ParrafoContactoDos'>Email: spartagyym@gmail.com<br></br>
                        Whatsapp: +598 098 34 02 64<br></br>
                        Dirección: Agraciada 1664, Salto, Uruguay</p>          
                  </div>
                  <div className='col-12 col-md-5'>
                      <p className='ParrafoContactoUno'>Deja tu información y te contactaremos muy pronto</p>                      
                      <Form>
                          <Form.Group className="mb-3" controlId="Nombre">                            
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="input"/>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Email">                            
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control type="email" placeholder="email@gmail.com" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Mensaje1">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                          </Form.Group>
                          <Button variant="dark">Enviar</Button>
                       </Form>                                         
                  </div>
                  <div className='col-12 col-md-1'>
                                
                  </div>                
                </div>            
    </Container>
    </Layout>
  );
}

export default Contacto;