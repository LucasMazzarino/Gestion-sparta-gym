import React from 'react';
import Header from '../componentes/Header';
import SeccionDos from '../componentes/SeccionDos';
import SeccionTres from '../componentes/SeccionTres';
import SeccionUno from '../componentes/SeccionUno';
import Footer from '../componentes/Footer';

function Inicio(){
  return(
    <div className='Inicio'>
        <Header/>
        <SeccionUno/>
        <SeccionDos/>
        <SeccionTres/>
        <Footer/>             
    </div>
  );
}

export default Inicio;