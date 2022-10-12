import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { confirm_reset_password } from '../../redux/actions/auth'
import { useParams,Navigate } from 'react-router'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ConfirmResetPassword = ({
  confirm_reset_password,
  loading
}) => {
  const params = useParams()

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [request, setRequest] = useState(false);

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password:''
  })

  const { 
    new_password,
    re_new_password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    const uid = params.uid
    const token = params.token

    confirm_reset_password(uid, token, new_password,re_new_password)
    if (new_password === re_new_password)
      setRequest(true);
  }

  if (request && !loading)
        return <Navigate to='/' />;

  return (
    <Layout>
          <Container className='seccionConfirmarReseteo'>              
                      <Row>                        
                          <Col md={12}>
                          <Form onSubmit={e=>onSubmit(e)}>
                                  <Form.Group className="mb-3" >
                                    <Form.Label>Ingrese su nueva contraseña</Form.Label>
                                    <Form.Control
                                                name="new_password"
                                                value={new_password}
                                                onChange={e=>onChange(e)}
                                                type="password"
                                                placeholder="Contraseña"
                                                required />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                  </Form.Group>
                                  <Form.Group className="mb-3" >
                                    <Form.Label>Repita su contraseña</Form.Label>
                                    <Form.Control
                                                name="re_new_password"
                                                value={re_new_password}
                                                onChange={e=>onChange(e)}
                                                type="password"
                                                placeholder="Contraseña"
                                                required />
                                    <Form.Text className="text-muted">
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
                                    <Button type="submit" variant="primary">Confirmar</Button>}
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
  confirm_reset_password
}) (ConfirmResetPassword)