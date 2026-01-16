import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login'; 
import Mapa from './components/Mapa';
import Estadisticas from './components/Estadisticas';
import Reservas from './components/Reservas';

import './App.css';

const App = () => {
  const [estaLogueado, setEstaLogueado] = useState(() => {
    return localStorage.getItem('sesionIniciada') === 'true';
  });

  const [emailUsuario, setEmailUsuario] = useState(() => {
    return localStorage.getItem('emailUsuario') || '';
  });

  const handleLogin = (emailInput) => {
    localStorage.setItem('sesionIniciada', 'true');
    localStorage.setItem('emailUsuario', emailInput);
    
    setEstaLogueado(true);
    setEmailUsuario(emailInput);
  };

  const handleLogout = () => {
    localStorage.removeItem('sesionIniciada');
    localStorage.removeItem('emailUsuario');
    
    setEstaLogueado(false);
    setEmailUsuario('');
  };

  if (!estaLogueado) {
      return <Login acceder={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div className="dashboard-container">
        
        <nav className="sidebar">
          <div className="logo">
            Gestor Cargadores
          </div>

          <Link to="/" className="menu-link">
            Mapa Puntos
          </Link>
          
          <Link to="/reservas" className="menu-link">
            Mis Reservas
          </Link>

          <Link to="/stats" className="menu-link">
            Estadísticas
          </Link>

          <div className="sidebar-spacer"></div>

          <div className="sidebar-footer">
             <p className="user-email">
                {emailUsuario || 'Usuario'}
             </p>
             <button onClick={handleLogout} className="btn-logout">
                Cerrar Sesión
             </button>
          </div>
        </nav>

        <main className="main-content">
          <header className="top-bar">
            <h3>Panel de Usuario</h3>
            <div className="user-avatar">
                {emailUsuario ? emailUsuario.charAt(0).toUpperCase() : 'U'}
            </div>
          </header>

          <div className="page-area">
            <Routes>
              <Route path="/" element={<Mapa />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/stats" element={<Estadisticas />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;