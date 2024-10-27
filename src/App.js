import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AlteraProduto from './pages/AlteraProduto';
import CadastraProduto from './pages/CadastraProduto';
import DetalheProduto from './pages/DetalheProduto';
import Home from './pages/Home';

function App() {
  const [produtos, setProdutos] = useState([]);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('https://apoleon.com.br/api/produtos');
      if (!response.ok) {
        throw new Error('Erro na rede');
      }
      const result = await response.json();
      setProdutos(result.filter(item => item.statusProduto === 1)); // Filtra produtos ativos
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProdutos(); // Chama a função para buscar produtos ao montar o componente
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalheproduto/:id" element={<DetalheProduto />} />
          <Route path="/alteraproduto" element={<AlteraProduto />} />
          <Route 
            path="/cadastraproduto" 
            element={<CadastraProduto fetchProdutos={fetchProdutos} />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
