import React from 'react';

interface PropsDoTitulo {
  texto: React.ReactNode;
  nivel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Titulo = ({ texto }: PropsDoTitulo) => {
  return <h2>{texto}</h2>;
};