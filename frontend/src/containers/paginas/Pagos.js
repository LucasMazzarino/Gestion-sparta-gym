import Layout from '../../hocs/Layout';
import { Card, Row, Col } from 'react-bootstrap';
import { useEffect, Fragment, useState } from "react";
import { connect } from 'react-redux';
import { get_pagos } from "../../redux/actions/pagos";
import "./../../styles/Pagos.css"

const Pagos = ({
  get_pagos,
  pagos,
}) => {
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    get_pagos()
  }, []);

  const getPagosClass = (detalle) => {
    if (detalle.pendiente) {
      return "red";
    } else {
      return "green";
    }
  };

  return (
    <Layout>
      <section className='Pagos'>
        <h1>Estado de Cuenta</h1>
        <Row>
          <Col>
            <Card className="user-card">
              <Card.Header className="user-header">Clientes</Card.Header>
              <Card.Body>
                <Row>
                  <Col className="client-name-header">Nombre</Col>
                </Row>
                {pagos?.map((pago) => (
                  <Row key={pago.id}>
                    <Col>
                      <button
                        className={`client-name ${selectedClient?.id === pago.id ? 'selected' : ''}`}
                        onClick={() => setSelectedClient(pago)}
                      >
                        {pago.nombre} {pago.apellido}
                      </button>
                    </Col>
                  </Row>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="user-card">
              <Card.Header className="user-header">Detalles</Card.Header>
              {selectedClient?.id && (
                <Card.Body>
                  {selectedClient.pagos.map((detalle, index) => (
                    <Fragment key={index}>
                      <Row>
                        <Col className="data-label">Curso:</Col>
                        <Col className={getPagosClass(detalle)}>{detalle.curso.nombre}</Col>
                      </Row>
                      <Row>
                        <Col className="data-label">Pago el dia:</Col>
                        <Col>{detalle.dia_de_pago}</Col>
                      </Row>
                    </Fragment>
                  ))}
                  {selectedClient.pagos.some((detalle) => detalle.pendiente) && (
                    <Row>
                      <Col className="data-label red">Pago pendiente:</Col>
                      <Col className="red">Falta pagar</Col>
                    </Row>
                  )}
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  pagos: state.Pagos.pagos,
});

export default connect(mapStateToProps, {
  get_pagos,
})(Pagos);