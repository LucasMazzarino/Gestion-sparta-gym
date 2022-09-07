import React from 'react';
import MujerEntrenando from '../imagenes/MujerEntrenando.jpg'
import HombreEntrenando from '../imagenes/HombreEntrenando.jpg'

function SeccionDos(){
  return(
    <div className='SeccionDos'>    
            <div className="row">
                <div className="col-md-6" id='FondoUno'>              
                      <img src={MujerEntrenando}></img>
                      <p id='TextoUno'>Ejercicios para ELLAS</p>       
                </div>
                 <div className="col-md-6" id='FondoDos'>                     
                      <img src={HombreEntrenando}></img>
                      <p id='TextoDos'>Ejercicios para ELLOS</p>                             
                </div>                            
            </div>       
    </div>
  );
}

export default SeccionDos;