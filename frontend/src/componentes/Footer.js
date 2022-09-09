import React from 'react';
import Facebook from '../imagenes/Facebook.png';
import Instagram from '../imagenes/Instagram.png';
import Twitter from '../imagenes/Twitter.png';
import Whatsapp from '../imagenes/Whatsapp.png';

function Footer() {
  return (
    <div>
        <footer>
            <div className='container'>
              <div className='row'>
                <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>               
                    <p className='font-weight-bold mb-2'>¡Síguenos en nuestras redes sociales!<br/>                      
                        <img src={Facebook} height='40' width='40'/>
                        <img src={Instagram} height='40' width='40'/>
                        <img src={Twitter} height='40' width='40'/>               
                    </p>           
                </div>
                <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>
                    <p id='Derechos'>® 2022 SPARTA GYM All rights reserved <br/>
                    Politica de privacidad - Designed by MazzSilv</p>
                </div>
                <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>
                  <button className="btn-flotante"><img src={Whatsapp} width='30' height='30'/>Comunicate con nosotros</button> 
                </div>
              </div>
            </div>

        </footer>
    </div>





  )
}

export default Footer