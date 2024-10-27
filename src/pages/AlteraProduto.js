// src/pages/AlteraProduto.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import './AlteraProduto.css';

function AlteraProduto() {
  const navigate = useNavigate(); 
  const [produtos, setProdutos] = useState([]);
  const [setSelectedProduto] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('https://apoleon.com.br/api/produtos');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleSelectProduto = (produto) => {
    setSelectedProduto(produto);
    // Navegar para a página de cadastro passando o produto como estado
    navigate('/cadastraproduto', { state: { produto } });
  };

  return (
    <div className="altera-produto-container">
      <Breadcrumbs current="Produtos" />
      <p>Produtos</p>
      <button className="altera-new-product-button" style={{ marginTop: '15px' }} onClick={() => navigate('/cadastraproduto')}>Novo</button>
      <div className="altera-product-list">
        {produtos.map(produto => (
          <div className="altera-product-item" key={produto.id}>
            <label className="product-name-label">
              <input type="text" value={produto.nomeProduto} readOnly className="product-name-input" />
            </label>
            <button className="altera-edit-button" onClick={() => handleSelectProduto(produto)}>Alterar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlteraProduto;
