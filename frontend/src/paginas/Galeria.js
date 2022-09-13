import React from "react";
import Cry from '../imagenes/Cry.jpg';
import Image from 'react-bootstrap/Image';


function Galeria(){
    return(
        <section className="Galeria">
            <h1>Galeria</h1>
            <div className="container">
                <div className="row">
                    <div className='col-12 col-md-2'>
                                            
                    </div>
                    <div className='col-12 col-md-10'>                      
                        <div className="row">
                             <div className='col-md-3'><Image src={Cry}/></div>
                             <div className='col-md-3'><Image src={Cry}/></div>
                             <div className='col-md-3'><Image src={Cry}/></div>
                        </div>
                        <div className="row">
                             <div className='col-md-3'><Image src={Cry}/></div>
                             <div className='col-md-3'><Image src={Cry}/></div>
                             <div className='col-md-3'><Image src={Cry}/></div>
                        </div>
                        <div className="row">
                            <div className='col-md-3'><Image src={Cry}/></div>
                            <div className='col-md-3'><Image src={Cry}/></div>
                            <div className='col-md-3'><Image src={Cry}/></div>
                        </div>
                        <div className="row">
                            <div className='col-md-3'><Image src={Cry}/></div>
                            <div className='col-md-3'><Image src={Cry}/></div>
                            <div className='col-md-3'><Image src={Cry}/></div>
                        </div>                                       
                    </div>
                    <div className='col-12 col-md-2'>
                                          
                    </div>
                </div>
            </div>     
        </section>
    );



}


export default Galeria;