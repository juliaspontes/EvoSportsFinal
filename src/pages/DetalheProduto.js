import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetalheProduto.css';

function DetalheProduto() {
  const { id } = useParams(); // Acessa o ID a partir da URL
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      if (!id) {
        setError('Produto não encontrado!');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://apoleon.com.br/api/produto/${id}`);

        if (!response.ok) {
          throw new Error('Erro ao buscar produto');
        }

        const data = await response.json();
        console.log('Dados retornados da API:', data); // Verifique a resposta da API

        if (!data) {
          setError('Produto não encontrado!');
        } else {
          setProduto(data.date);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="product-details-container">
        <div className="product-image">
          <img src={produto?.imgProduto || "https://via.placeholder.com/400x400"} alt="Produto" />
        </div>
        <div className="product-info">
          <h1>{produto?.nomeProduto || "Nome não disponível"}</h1>
          <p>{produto?.descricaoProduto || "Descrição não disponível"}</p>
          <p>
            <strong>Preço:</strong> R$ {produto?.valorProduto ? parseFloat(produto.valorProduto).toFixed(2) : 'N/A'}
          </p>
          <p>
            <strong>Tamanho:</strong> {produto?.tamanhoProduto || "Tamanho não disponível"}
          </p>
          <p>
            <strong>Status:</strong> {produto?.statusProduto === 1 ? 'Ativo' : 'Inativo'}
          </p>
          <button className="buy-button">Comprar</button>
        </div>
      </div>
    </div>
  );
}

export default DetalheProduto;
