import React from 'react';
import SeccionUno from '../componentes/SeccionUno';
import SeccionDos from '../componentes/SeccionDos';
import SeccionTres from '../componentes/SeccionTres';


function Inicio(){
  return(
    <div className='Inicio'>       
        <SeccionUno/>  
        <SeccionDos/>
        <SeccionTres/>
    </div>
  );
  
}



export default Inicio;