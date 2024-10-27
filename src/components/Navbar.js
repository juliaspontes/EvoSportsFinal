import React from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação
import logoImg from '../imagens/logo.png'; // Importação do logo
import './Navbar.css';

function Navbar() {
  return (
    <div>
      <nav className="nav">
        <div className="logo">EVO SPORTS </div>
        <ul>
          <li><a className="textonav" href="#">Ajuda</a></li>
          <li><a className="textonav" href="#">|</a></li>
          <li>
            <Link className="textonav" to="/alteraproduto">Entrar</Link> 
          </li>
        </ul>
      </nav>
      <nav className="second-nav">
        <div className="second-nav-logo">
          <Link to="/"> 
            <img src={logoImg} alt="Logo Evo Sports" />
          </Link>
        </div>
        <div className="second-nav-links">
          <a href="#">Treino & Academia</a>
          <a href="#">Casual</a>
          <a href="#">Acessórios</a>
        </div>
        <div className="second-nav-search">
          <input type="text" placeholder="Buscar" className="search-input" />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
