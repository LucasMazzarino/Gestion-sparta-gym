import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Contacto from './paginas/Contacto';
import Galeria from './paginas/Galeria';



function App() {
  return ( 
    <BrowserRouter>
        <Navbar/>
        <Routes>
           <Route index element={<Inicio/>}/>
           <Route path='/Contacto' element={<Contacto/>}/>
           <Route path='/Galeria' element={<Galeria/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>      
        
        
  );
}

export default App;
