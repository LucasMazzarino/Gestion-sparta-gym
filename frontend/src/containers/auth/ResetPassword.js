import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { reset_password } from '../../redux/actions/auth'
import { Navigate } from 'react-router'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ResetPassword = ({
  reset_password,
  loading
}) => {

  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [formData, setFormData] = useState({
    email: '',
  })

  const { 
    email,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    reset_password(email);
    setRequestSent(true)
  }

  if (requestSent && !loading)
        return <Navigate to='/' />;

  return (    
    <Layout>
      <Container className='seccionResetPassword'>          
        <Row>             
          <Col md={12}>
            <Form onSubmit={e=>onSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Dirección de E-Mail</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={e=>onChange(e)}
                  type="email"
                  placeholder="Email"
                  required />
                <Form.Text className="text-muted">
                  Ingrese su E-Mail para resetear la contraseña
                </Form.Text>
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
                  Enviando...
                  </Button>:
                  <Button type="submit" variant="primary">Enviar E-Mail</Button>}
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
  reset_password
}) (ResetPassword)