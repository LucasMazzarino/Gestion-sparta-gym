import React from "react";
import Galeria1 from '../../imagenes/Galeria1.jfif';
import Galeria2 from '../../imagenes/Galeria2.jfif';
import Galeria3 from '../../imagenes/Galeria3.jfif';
import Galeria5 from '../../imagenes/Galeria5.jpg';
import Galeria6 from '../../imagenes/Galeria6.jpg';
import Image from 'react-bootstrap/Image';
import Layout from "../../hocs/Layout";
import Container from "react-bootstrap/esm/Container";



function Galeria(){
    return(
        <Layout>
        <Container className="Galeria">
            <h1>Galeria</h1>            
                <div className="row">
                    <div className='col-12 col-md-2'>
                                            
                    </div>
                    <div className='col-12 col-md-10'>                      
                        <div className="row">
                             <div className='col-md-6'><Image src={Galeria1}/></div>                             
                             <div className='col-md-3'><Image src={Galeria2}/></div>
                        </div>
                        <div className="row">                            
                             <div className='col-md-9'><Image src={Galeria3}/></div>                            
                        </div>
                        <div className="row">
                            <div className='col-md-5'><Image src={Galeria5}/></div>
                            <div className='col-md-4'><Image src={Galeria6}/></div>                        
                        </div>                                                           
                    </div>
                    <div className='col-12 col-md-2'>
                                          
                    </div>
                </div>             
        </Container>
        </Layout>
    );



}


export default Galeria;