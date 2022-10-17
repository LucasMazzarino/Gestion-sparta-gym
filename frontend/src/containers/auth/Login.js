import React from 'react';
import Layout from '../../hocs/Layout';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';



import Form from 'react-bootstrap/Form';

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
        <section className='seccionLogin'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-3'>

              </div>
              <div className='col-12 col-md-6 d-flex aling-items-center justify-content-center'>
              <Form onSubmit={e=>onSubmit(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Ingrese su cédula</Form.Label>
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
                      <Form.Label>Ingrese su contraseña</Form.Label>
                      <Form.Control name="password"
                          value={password}
                          onChange={e=>onChange(e)}
                          type="password" 
                          required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Recúerdame" />
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
                      <Button type="submit" variant="primary" >Iniciar sesión</Button>}
                 </div>
              <div>
                <br></br>
                <Link to="/reset_password">Olvidaste la contraseña?</Link>
              </div>
            </Form>

              </div>
              <div className='col-12 col-md-3'>
              </div>     
          </div>
        </div>
     </section>
     <br></br>
      <br></br>
      <br></br>
      <br></br> 
      <br></br>
      <br></br>  
      <br></br>
      <br></br>
      <br></br>  
      <br></br>    
  </Layout>
)
}
const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  login
}) (Login)