import '../src/css/App.css';
import SideBar from './components/SideBar';
import Home from './pages/Home'
import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import AfficherOffres from './pages/AfficherOffres'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ModifierOffres from './pages/ModifierOffres';

function App() {
  return (
    <div className="App">
      
      <SideBar />
      <BrowserRouter>
      <div className='pages'>
        <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> 
          <Route path="/home"
          element={<Home />}
          />
          <Route path="/Afficher"
          element={<AfficherOffres />}
          />
          <Route path="/Modifier/:id" 
          element={<ModifierOffres />}
           />

        
        </Routes>
      </div>
      </BrowserRouter>
      <ToastContainer />

    </div>
  );
}

export default App;
