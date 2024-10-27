// src/App.js

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AlteraProduto from './pages/AlteraProduto';
import CadastraProduto from './pages/CadastraProduto';
import DetalheProduto from './pages/DetalheProduto';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<DetalheProduto />} />
          <Route path="/alteraproduto" element={<AlteraProduto />} />
          <Route path="/cadastraproduto" element={<CadastraProduto />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


