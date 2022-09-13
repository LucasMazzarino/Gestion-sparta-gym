import Carousel from 'react-bootstrap/Carousel';
import EjercicioUno from '../imagenes/EjercicioUno.jpg';
import EjercicioDos from '../imagenes/EjercicioDos.jpg';
import EjercicioTres from '../imagenes/EjercicioTres.jpg';

function SeccionUno() {
  return (
    <section className='SeccionUno'>
        <Carousel>
          <Carousel.Item>       
            <img
              className="d-block w-100"
              src={EjercicioUno}
              alt="First slide"
              height='600'
            />
            <Carousel.Caption>
              <h1>First slide label</h1>          
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
              <h1>Second slide label</h1>
              
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
              <h1>Third slide label</h1>          
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    </section>
  );
}

export default SeccionUno;