import React from 'react';
import SeccionUno from '../SeccionUno';
import SeccionDos from '../SeccionDos';
import SeccionTres from '../SeccionTres';
import Layout from '../../hocs/Layout';



function Inicio(){
  return(
    <Layout>
    <div className='Inicio'>       
        <SeccionUno/>  
        <SeccionDos/>
        <SeccionTres/>
    </div>
    </Layout>
  );
  
}



export default Inicio;