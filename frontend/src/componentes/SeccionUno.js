import Carousel from 'react-bootstrap/Carousel';
import EjercicioUno from '../imagenes/EjercicioUno.jpg';
import EjercicioDos from '../imagenes/EjercicioDos.jpg';
import EjercicioTres from '../imagenes/EjercicioTres.jpg';

function SeccionUno() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={EjercicioUno}
          alt="First slide"
          height='600'
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={EjercicioDos}
          alt="Second slide"
          height='600'
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={EjercicioTres}
          alt="Third slide"
          height='600'
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SeccionUno;