import React from 'react'; 

function Header(){
  return(
    <div className='Header'>
       <nav className="navbar navbar-expand-lg navbar-dark bg-black">
            <div className='container-fluid'>              
                <img src='https://img.freepik.com/vector-premium/logotipo-fitness-gym_23987-169.jpg?w=740' width='100' height='100'/>                          
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Cursos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Noticias</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contacto</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Galeria</a>
                    </li>
                    </ul>
                </div>
                <button type="button" className="btn btn-primary" id='iniciarSesion'>Iniciar sesión</button>
            </div>
        </nav>      
    </div>
  );
}

export default Header;