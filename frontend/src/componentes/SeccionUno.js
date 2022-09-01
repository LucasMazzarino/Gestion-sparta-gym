import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function SeccionUno(){
  return(
    <div className='SeccionUno'>                  
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/personal-weight-training-in-the-gym-royalty-free-image-1568020980.jpg?crop=0.65809xw:1xh;center,top&resize=980:*'
          width='300'
          height='800'
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://elucabista.com/wp-content/uploads/2017/01/portada3.jpg"
          width='300'
          height='800'
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://t2.uc.ltmcdn.com/es/posts/8/5/0/las_mejores_clases_para_mantenerme_en_forma_en_el_gimnasio_31058_orig.jpg"
          width='300'
          height='800'
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default SeccionUno;