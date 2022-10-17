import React from 'react';
import ImagenUno from '../imagenes/ImagenUno.jfif'
import ImagenDos from '../imagenes/ImagenDos.jpg'
import ImagenTres from '../imagenes/ImagenTres.jpg'
import ImagenCuatro from '../imagenes/ImagenCuatro.jpg'
import Image from 'react-bootstrap/Image';




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
                <div className='row'>
                    <div className='col-md-4 d-flex aling-items-center justify-content-center'>
                        <Image src={ImagenDos} rounded width='300' height='500' className='ImagenDos'/>  
                    </div>  
                    <div className='col-md-4 d-flex aling-items-center justify-content-center'>
                        <Image src={ImagenTres} rounded width='300' height='500' className='ImagenTres'/>  
                    </div>  
                    <div className='col-md-4 d-flex aling-items-center justify-content-center'>
                        <Image src={ImagenCuatro} rounded width='300' height='500' className='ImagenCuatro'/>  
                    </div>               
                </div>                    
        </div>
     </section>
  );
}

export default SeccionCuatro;