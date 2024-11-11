import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CadastraProduto.css';

function CadastrarProduto({ fetchProdutos }) {
  const location = useLocation();
  const produto = location.state?.produto;

  const [formData, setFormData] = useState({
    titulo: produto ? produto.nomeProduto : '',
    preco: produto ? produto.valorProduto : '',
    descricao: produto ? produto.descricaoProduto : '',
    tamanho: produto ? produto.tamanhoProduto : '',
    status: produto ? produto.statusProduto : 1,
    qrcode: produto ? produto.qrCodeProduto : '',
    imagem: produto ? produto.imgProduto : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { titulo, preco, descricao, tamanho, qrcode, imagem } = formData;

    if (!titulo || !preco || !descricao || !tamanho || !qrcode || !imagem) {
      alert('Todos os campos devem ser preenchidos.'); // Pop-up para erro
      return false; // Validação falhou
    }
    if (isNaN(preco) || Number(preco) < 0) {
      alert('O preço deve ser um número válido.'); // Pop-up para erro
      return false; // Validação falhou
    }
    if (
      titulo.length > 30 ||
      descricao.length > 30 ||
      tamanho.length > 30 ||
    ) {
      alert('Todos os campos devem ter no máximo 30 caracteres.'); // Pop-up para erro
      return false; // Validação falhou
    }

    return true; // Validação bem-sucedida
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Não prossegue se houver erro
    }

    try {
      const method = produto ? 'PUT' : 'POST';
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

      alert('Produto salvo com sucesso!');
      fetchProdutos(); // Atualiza a lista de produtos após salvar

      // Limpar o formulário após o envio
      setFormData({
        titulo: '',
        preco: '',
        descricao: '',
        tamanho: '',
        status: 1,
        qrcode: '',
        imagem: ''
      });
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert(error.message);
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = formData.status === 1 ? 0 : 1; // Alterna entre 0 e 1
    try {
      const response = await fetch(`https://apoleon.com.br/api/produto/${produto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          statusProduto: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar status do produto');
      }

      // Atualiza o estado local imediatamente
      setFormData(prevData => ({ ...prevData, status: newStatus }));

      alert(`Produto ${newStatus === 1 ? 'ativado' : 'desativado'} com sucesso. Salve a alteração!`);
      fetchProdutos(); // Atualiza a lista de produtos após a alteração de status
    } catch (error) {
      console.error('Erro ao atualizar status do produto:', error);
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
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} className="styled-input" maxLength={30} />
          </label>
          <label>
            Preço
            <input type="number" name="preco" value={formData.preco} onChange={handleChange} className="styled-input" maxLength={30} />
          </label>
        </div>
        <label>
          Descrição
          <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} className="styled-input" maxLength={30} />
        </label>
        <div className="form-row">
          <label>
            Tamanho
            <input type="text" name="tamanho" value={formData.tamanho} onChange={handleChange} className="styled-input" maxLength={30} />
          </label>
          <label>
            QR Code
            <input type="text" name="qrcode" value={formData.qrcode} onChange={handleChange} className="styled-input" />
          </label>
          <label>
            Imagem
            <input type="text" name="imagem" value={formData.imagem} onChange={handleChange} className="styled-input" />
          </label>
        </div>
        <div className="button-container">
          <button type="submit" className="save-button">{produto ? 'Salvar' : 'Salvar'}</button>
          {produto && (
            <button 
              type="button" 
              className="save-button"
              onClick={handleToggleStatus}
            >
              {formData.status === 1 ? 'Desativar' : 'Ativar'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CadastrarProduto;
