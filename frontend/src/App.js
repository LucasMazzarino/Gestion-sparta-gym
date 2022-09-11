import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Contacto from './paginas/Contacto';
import Galeria from './paginas/Galeria';



function App() {
  return ( 
    <Router>
        <Navbar/>
        <Route></Route>
        <Route></Route>
        <Footer/>
    </Router>      
        
        
  );
}

export default App;
