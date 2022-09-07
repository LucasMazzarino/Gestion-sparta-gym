import React from 'react';
import MujerEntrenando from '../imagenes/MujerEntrenando.jpg'
import HombreEntrenando from '../imagenes/HombreEntrenando.jpg'
import Image from 'react-bootstrap/Image'

function SeccionDos(){
  return(
    <section id='SeccionDos'>
        <div className='container'>
              <div className='row'>
                <div className='col-12 col-md-6 d-flex aling-items-center justify-content-center'>
                      <div className='ParteUno'>
                        <h1>Para Ellas</h1>
                        <Image src={MujerEntrenando} rounded width='400' height='300'/>                                           
                      </div>                        
                </div>
                <div className='col-12 col-md-6 d-flex aling-items-center justify-content-center'>
                      <div className='ParteDos'>
                        <h1>Para Ellos</h1> 
                        <Image src={HombreEntrenando} rounded width='400' height='300'/>                                          
                      </div>             
                </div>                
              </div>
        </div>
     </section>
  );
}

export default SeccionDos;