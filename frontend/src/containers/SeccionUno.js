import Carousel from 'react-bootstrap/Carousel';
import EjercicioUno from '../imagenes/EjercicioUno.jfif';
import Imgart from '../imagenes/Imgart.jpg'
import EjercicioTres from '../imagenes/EjercicioTres.jpg'


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
              <h1></h1>          
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Imgart}
              alt="Second slide"
              height='600'
            />

            <Carousel.Caption>
              <h1>Descubri lo que tu cuerpo es capaz de hacer</h1>
              
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
              <h1>Tu proceso siempre supervisado</h1>          
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    </section>
  );
}

export default SeccionUno;