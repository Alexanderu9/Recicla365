import React from 'react';

interface PropsDoParagrafo {
  texto: React.ReactNode;
}

export const Paragrafo = ({ texto }: PropsDoParagrafo) => {
  return <p>{texto}</p>;
};