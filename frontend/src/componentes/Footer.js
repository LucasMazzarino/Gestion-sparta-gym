import React from 'react';

function Footer(){
  return(
    <div className='Footer'>
        <div class="container-fluid">
            <div class="row">
                <div class='col-lg-4'>
                    <img src='https://cdn-icons-png.flaticon.com/512/174/174855.png' width='40' height='40'/>
                    <img src='https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-0.png' width='50' height='50'/> 
                    <img src='https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1.png' width='40' height='40'/> <br/>
                    <p id='redes'>¡Síguenos en nuestras redes sociales!</p>
                </div>
                 <div class='col-lg-4'>
                    <p id='Derechos'>® 2022 SPARTA GYM All rights reserved <br/>
                    Politica de privacidad - Designed by MazzSilv</p>
                </div>
                <div class='col-lg-4'>
                  <button className="btn-flotante"><img src='https://assets.stickpng.com/images/5ae21cc526c97415d3213554.png' width='60' height='40'/>Comunicate con nosotros</button> 
                </div>  
                          
            </div>
        </div>
    </div>
  );
}

export default Footer;