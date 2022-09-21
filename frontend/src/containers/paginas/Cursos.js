import React from 'react';
import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { get_cursos } from '../../redux/actions/cursos';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import CardImg from 'react-bootstrap/esm/CardImg';

const Cursos = ({
    get_cursos,
    cursos
}) => {

    useEffect(() => {
        get_cursos()
        window.scrollTo(0,0)
    }, [])

    return(
        <Layout>
        <section className='Cursos'>
            <h1>Cursos</h1>
            <Container fluid='sm'>
                {
                    cursos &&
                    cursos !== null &&
                    cursos !== undefined &&
                    cursos.map(curso => {
                        if (curso.length !== 0){
                            return(
                                <Card style={{ width: '18rem' }} key={curso.id}>
                                <CardImg src={curso.imagen.url}/>
                                <Card.Body>
                                  <Card.Title>{curso.nombre}</Card.Title>
                                  <Card.Text>
                                    {curso.descripcion}
                                  </Card.Text>
                                  <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                              </Card>
                            )
                        }
                        return <div></div>
                    })
                }          
            </Container>
        </section>
        </Layout>
    )
}

const mapStateToProps = state => ({
    cursos: state.Cursos.cursos
})

export default connect(mapStateToProps,{
    get_cursos,
}) (Cursos)