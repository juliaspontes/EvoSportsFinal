// src/pages/CadastraProduto.js

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CadastraProduto.css';

function CadastrarProduto() {
  const location = useLocation();
  const produto = location.state?.produto; // Acessa o produto passado

  const [formData, setFormData] = useState({
    titulo: produto ? produto.nomeProduto : '',
    preco: produto ? produto.valorProduto : '',
    descricao: produto ? produto.descricaoProduto : '',
    tamanho: produto ? produto.tamanhoProduto : '',
    status: produto ? produto.statusProduto : '',
    qrcode: produto ? produto.qrCodeProduto : '',
    imagem: produto ? produto.imgProduto : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = produto ? 'PUT' : 'POST'; // Se um produto existe, use PUT para editar
      const url = produto 
        ? `https://apoleon.com.br/api/produto/${produto.id}` 
        : 'https://apoleon.com.br/api/produto';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeProduto: formData.titulo,
          descricaoProduto: formData.descricao,
          tamanhoProduto: formData.tamanho,
          valorProduto: parseFloat(formData.preco).toFixed(2),
          imgProduto: formData.imagem,
          qrCodeProduto: formData.qrcode,
          statusProduto: formData.status
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar/alterar produto');
      }

      const result = await response.json();
      console.log('Produto salvo com sucesso:', result);
      alert('Produto salvo com sucesso!');

      // Limpar o formulário após o envio
      setFormData({
        titulo: '',
        preco: '',
        descricao: '',
        tamanho: '',
        status: '',
        qrcode: '',
        imagem: ''
      });
      
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert(error.message);
    }
  };

  return (
    <div className="cadastrar-produto-container">
      <nav className="breadcrumb">
        <Link to="/">Menu</Link> / <Link to="/alteraproduto">Produtos</Link> / <span className="current-page">Cadastrar</span>
      </nav>
      <p>{produto ? 'Alterar Produto' : 'Cadastrar Produto'}</p>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Título
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} className="styled-input" />
          </label>
          <label>
            Preço
            <input type="text" name="preco" value={formData.preco} onChange={handleChange} className="styled-input" />
          </label>
        </div>
        <label>
          Descrição
          <input name="descricao" value={formData.descricao} onChange={handleChange} className="styled-input" />
        </label>
        <div className="form-row">
          <label>
            Tamanho
            <input type="text" name="tamanho" value={formData.tamanho} onChange={handleChange} className="styled-input" />
          </label>
          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange} className="styled-input">
              <option value="">Selecione</option>
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
            </select>
          </label>
          <label>
            QR Code
            <input type="text" name="qrcode" value={formData.qrcode} onChange={handleChange} className="styled-input" />
          </label>
        </div>
        <label>
          Imagem
          <input type="text" name="imagem" value={formData.imagem} onChange={handleChange} className="styled-input" />
        </label>
        <div className="button-container">
          <button type="submit" className="save-button">{produto ? 'Alterar' : 'Salvar'}</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarProduto;
