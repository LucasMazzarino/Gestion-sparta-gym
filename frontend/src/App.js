import './App.css';
import Footer from './componentes/Footer';
import Header from './componentes/Header.js';
import SeccionUno from './componentes/SeccionUno';
import SeccionDos from './componentes/SeccionDos';

function App() {
  return (
    <div className="App">
      <Header/>
      <SeccionUno/>
      <SeccionDos/>
      <Footer/>
    </div>
  );
}

export default App;
