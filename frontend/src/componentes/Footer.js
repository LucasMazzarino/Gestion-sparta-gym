import React from 'react';

function Footer() {
  return (
    <div>
        <footer>
            <div className='container'>
              <div className='row'>
                <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>               
                    <p className='font-weight-bold mb-2'>¡Síguenos en nuestras redes sociales!<br/>                      
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-instagram"></i>
                        <i className="bi bi-twitter"></i></p>              
                </div>
                <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>
                    <p id='Derechos'>® 2022 SPARTA GYM All rights reserved <br/>
                    Politica de privacidad - Designed by MazzSilv</p>
                </div>
                <div className='col-12 col-md-4 d-flex aling-items-center justify-content-center'>
                  <button className="btn-flotante"><img src='https://assets.stickpng.com/images/5ae21cc526c97415d3213554.png' width='60' height='40'/>Comunicate con nosotros</button> 
                </div>
              </div>
            </div>

        </footer>


    </div>





  )
}

export default Footer