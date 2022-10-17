import React from 'react';
import EntrenadorUno from '../imagenes/EntrenadorUno.png'
import EntrenadorDos from '../imagenes/EntrenadorDos.jpg'
import Image from 'react-bootstrap/Image'



function SeccionTres(){
  return(
    <section className='SeccionTres'> 
              <h1>Nuestros entrenadores</h1>
              <p className='d-flex aling-items-center justify-content-center'>¡Te esperamos en el gimnasio que lo tiene todo! Aparatos nuevos de última generación, caminadores profesionales, bicis de spinning, escaladores, elípticas,  remos ergómetros</p> 
              <p className='d-flex aling-items-center justify-content-center'>Entrenadores certificados siempre disponibles en sala, el mejor ambiente y un estricto protocolo sanitario para cuidarte. Vení a divertirte!</p>
              <div className='container'>
                <div className='row'>
                  <div className='col-12 col-md-3'>
                                          
                  </div>
                  <div className='col-12 col-md-3'>
                        <div className='EntrenadorUno d-flex aling-items-center justify-content-center'>                        
                          <Image src={EntrenadorUno} rounded width='300' height='500'/>  
                          <p className='TextoUno'>Carlitos Tevez</p>                                                               
                        </div>                        
                  </div>
                  <div className='col-12 col-md-3'>
                        <div className='EntrenadorUno d-flex aling-items-center justify-content-center'>                        
                          <Image src={EntrenadorDos} rounded width='300' height='500'/>  
                          <p className='TextoDos'>Profe Bengoechea</p>                                                               
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