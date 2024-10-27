import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import carrosselImg from '../imagens/carrosel.png';
import './Home.css';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('https://apoleon.com.br/api/produtos');
      if (!response.ok) {
        throw new Error('Erro na rede');
      }
      const result = await response.json();
      setData(result.filter(item => item.statusProduto === 1)); // Filtra produtos ativos
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos(); // Chama a função para buscar produtos ao montar o componente
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <div className="carousel-container">
        <img src={carrosselImg} alt="Carrossel" className="carousel-image" />
        <div className="carousel-text">
          <h1 className="title">EM CONSTANTE EVOLUÇÃO</h1>
          <p>Melhore seu desempenho com <strong className="title1">EVO SPORTS</strong></p>
        </div>
      </div>
      <div className="product-container">
        {data.map((item) => (
          <div className="product-item" key={item.id}>
            <Link to={`/detalheproduto/${item.id}`}>
              <img src={item.imgProduto} alt={item.nomeProduto} className="product-image" />
            </Link>
            <div className="product-info">
              <h3>{item.nomeProduto}</h3>
              <p>Categoria</p>
              <p>R$ {isNaN(item.valorProduto) ? 'Preço indisponível' : parseFloat(item.valorProduto).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
