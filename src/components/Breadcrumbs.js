import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css'; 

const Breadcrumbs = ({ current }) => {
  return (
    <nav className="breadcrumbs">
      <Link to="/">Menu</Link> / <span>{current}</span>
    </nav>
  );
};

export default Breadcrumbs;
