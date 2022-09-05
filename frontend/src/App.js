import './App.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import SeccionUno from './componentes/SeccionUno';
import SeccionDos from './componentes/SeccionDos';
import SeccionTres from './componentes/SeccionTres';

function App() {
  return (
    <div className="App">
      <Header/>
      <SeccionUno/>
      <SeccionDos/>
      <SeccionTres/>
      <Footer/>    
    </div>
  );
}

export default App;
