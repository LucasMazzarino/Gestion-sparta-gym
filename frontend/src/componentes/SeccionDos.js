import React from 'react';

function SeccionDos(){
  return(
    <div className='SeccionDos'>    
            <div class="row">
                <div class="col-md-6">                    
                    <img src='https://nutricion360.es/wp-content/uploads/2020/06/mujeres-plan-quemar-grasa-ejercicios-768x512.jpg'/>
                    <div className='TextoCentradoUno'>               
                        para <strong id='ellas'>ELLAS</strong> / Contamos con un equipo de entrenadores que construyen un plan ajustado a tus objetivos.      
                    </div>                  
                </div>
                 <div class="col-md-6">                     
                     <img src='https://www.tododisca.com/wp-content/uploads/2022/01/ejercicio-fisico-casa-hombre-covid.jpg'/>
                     <div className='TextoCentradoDos'>
                        para <strong id='ellos'>ELLOS</strong> / Contamos con un equipo de entrenadores que construyen un plan ajustado a tus objetivos.  
                     </div>
                </div>                            
            </div>       
    </div>
  );
}

export default SeccionDos;