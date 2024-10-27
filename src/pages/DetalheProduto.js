import React, { useEffect, useState } from 'react';
import './DetalheProduto.css';

function DetalheProduto({ match }) {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const produtoId = match.params.id; // Obtendo o ID do produto da rota

  useEffect(() => {
    const fetchProduto = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const response = await fetch(`https://apoleon.com.br/api/produtos/${produtoId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar o produto');
        }
        const data = await response.json();
        setProduto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchProduto(); // Chama a função para buscar o produto
  }, [produtoId]); // Recarrega quando produtoId mudar

  if (loading) return <div>Carregando...</div>; // Exibe mensagem de carregamento
  if (error) return <div>Erro: {error}</div>; // Exibe mensagem de erro
  if (!produto) return <div>Produto não encontrado.</div>; // Validação caso produto seja null

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={produto.imgProduto} alt={produto.nomeProduto} />
      </div>
      <div className="product-info">
        <h1>{produto.nomeProduto}</h1>
        <p>{produto.descricao}</p>
        <p><strong>Preço:</strong> R$ {parseFloat(produto.valorProduto).toFixed(2)}</p>
        <button className="buy-button">Comprar</button>
      </div>
    </div>
  );
}

export default DetalheProduto;
