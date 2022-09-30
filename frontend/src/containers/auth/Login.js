import React from 'react';
import Layout from '../../hocs/Layout';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Form from 'react-bootstrap/Form';

import { Navigate } from 'react-router'
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const Login = ({
  login,
  loading
}) => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  

  const [formData, setFormData] = useState({
    cedula: '',
    password: '',
  })

  const { 
    cedula,
    password,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    login(cedula, password);
  }
  
  return (
    <Layout>
      <Container width="500%">
      <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Form onSubmit={e=>onSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ingrese su Cedula</Form.Label>
          <Form.Control name='cedula'
              value={cedula}
              onChange={e=>onChange(e)}
              type="number"
              required 
              />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control name="password"
              value={password}
              onChange={e=>onChange(e)}
              type="password" 
              required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <div>
          {loading ? 
          <Button  variant="primary" disabled>
            <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
          </Button>:
          <Button type="submit" variant="primary">Login</Button>}
          </div>
        <div>
          <Link to="/reset_password">Olvidaste la contraseña?</Link>
        </div>
      </Form>
      </Col>
      </Row>
    </Container>
    </Layout>
)
}
const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  login
}) (Login)