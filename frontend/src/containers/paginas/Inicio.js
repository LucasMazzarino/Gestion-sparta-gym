import React from 'react';
import SeccionUno from '../SeccionUno';
import SeccionDos from '../SeccionDos';
import SeccionTres from '../SeccionTres';
import Layout from '../../hocs/Layout';
import SeccionCuatro from '../SeccionCuatro';



function Inicio(){
  return(
    <Layout>
    <div className='Inicio'>       
        <SeccionUno/>  
        <SeccionDos/>      
        <SeccionCuatro/>
        <SeccionTres/>
    </div>
    </Layout>
  );
  
}



export default Inicio;