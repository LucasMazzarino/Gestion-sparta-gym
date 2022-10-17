import React from "react";
import Galeria1 from '../../imagenes/Galeria1.jfif';
import Galeria2 from '../../imagenes/Galeria2.jfif';
import Galeria3 from '../../imagenes/Galeria3.jfif';
import Galeria5 from '../../imagenes/Galeria5.jpg';
import Galeria6 from '../../imagenes/Galeria6.jpg';
import Image from 'react-bootstrap/Image';
import Layout from "../../hocs/Layout";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Galeria(){
    return(
        <Layout>
        <Container className="Galeria" fluid='md'>
            <h1>Galeria</h1>            
                <Row> 
                    <Col md={2} ></Col>                   
                    <Col md={10} sm={12}>                      
                        <Row>
                             <div className='col-md-6'><Image src={Galeria1}/></div>                             
                             <div className='col-md-3'><Image src={Galeria2}/></div>
                        </Row>
                        <Row className="row">                            
                             <div className='col-md-9'><Image src={Galeria3}/></div>                            
                        </Row>
                        <Row>
                            <div className='col-md-5'><Image src={Galeria5}/></div>
                            <div className='col-md-4'><Image src={Galeria6}/></div>                        
                        </Row>                                                           
                    </Col>
                    <Col md={2}></Col>                     
                </Row>             
        </Container>
        </Layout>
    );



}


export default Galeria;