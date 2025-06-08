import React from 'react';

interface PropsDoBotao {
  tipo?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  estilo?: string; 
}

export const Botao = ({ tipo = 'button', children, onClick }: PropsDoBotao) => {
  return (
    <button type={tipo} onClick={onClick}>
      {children}
    </button>
  );
};