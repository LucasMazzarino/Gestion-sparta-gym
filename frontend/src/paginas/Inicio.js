import React from 'react';
import Navbar from '../componentes/Navbar';
import SeccionUno from '../componentes/SeccionUno';
import SeccionDos from '../componentes/SeccionDos';
import Footer from '../componentes/Footer';
import SeccionTres from '../componentes/SeccionTres';


const inicio = () => {
  return(
    <div className='Inicio'>       
        <Navbar/>
        <SeccionUno/>  
        <SeccionDos/>
        <SeccionTres/>
        <Footer/>
               
    </div>
  );
  
}



export default inicio;