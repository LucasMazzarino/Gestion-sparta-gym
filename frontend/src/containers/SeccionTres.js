import React from 'react';
import EntrenadorUno from '../imagenes/EntrenadorUno.jpg'
import EntrenadorDos from '../imagenes/EntrenadorDos.jpg'
import Image from 'react-bootstrap/Image'



function SeccionTres(){
  return(
    <section className='SeccionTres'> 
              <h1>Nuestros entrenadores</h1>
              <p className='d-flex aling-items-center justify-content-center'>En el gimnasio encontrarás entrenadores certificados siempre disponibles a ayudarte y a sacar lo mejor de ti!</p> 
              <p className='d-flex aling-items-center justify-content-center'>Sumate a nuestros entrenmianetos! Te esperamos!</p>
              <div className='container'>
                <div className='row'>
                  <div className='col-12 col-md-3'>
                                          
                  </div>
                  <div className='col-12 col-md-3'>
                        <div className='EntrenadorUno d-flex aling-items-center justify-content-center'>                        
                          <Image src={EntrenadorUno} rounded width='300' height='500'/>                                                                                   
                        </div>                        
                  </div>
                  <div className='col-12 col-md-3'>
                        <div className='EntrenadorUno d-flex aling-items-center justify-content-center'>                        
                          <Image src={EntrenadorDos} rounded width='300' height='500'/>                                                                                      
                        </div>                        
                  </div>
                  <div className='col-12 col-md-3'>
                                
                  </div>                
                </div>
              </div>
    </section>
  );
}

export default SeccionTres;