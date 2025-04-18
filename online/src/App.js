import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Tutor from './Components/Tutor';
import Tutornav from './Components/Tutornav';
import Tutorfooter from './Components/Tutorfooter';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
      <Footer/>
      {/* <Tutornav/>
      <Tutor/>
      <Tutorfooter/> */}

    </div>
  );
}

export default App;
