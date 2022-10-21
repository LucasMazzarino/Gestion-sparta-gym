import React from 'react';
import Facebook from '../../imagenes/Facebook.png';
import Instagram from '../../imagenes/Instagram.png';
import Twitter from '../../imagenes/Twitter.png';
import Whatsapp from '../../imagenes/Whatsapp.png'

export function Footer() {
  return (
    <div>
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>               
              <p className='font-weight-bold mb-2'>¡Síguenos en nuestras redes sociales!<br/>                      
                  <img src={Facebook} height='40' width='40'alt="face"/>
                  <a href='https://www.instagram.com/sparta_sit/' ><img src={Instagram} height='40' width='40' alt="insta"/></a>
                  <img src={Twitter} height='40' width='40' alt='twiter'/>               
              </p>           
            </div>
            <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>
              <p id='Derechos'>® 2022 SPARTA GYM All rights reserved <br/>
              Politica de privacidad - Designed by MazzSilv</p>
            </div>
            <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>
              <a href='https://web.whatsapp.com/' ><button className="btn-flotante"><img src={Whatsapp} width='30' height='30' alt="wpp"/>Comunicate con nosotros</button> </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

