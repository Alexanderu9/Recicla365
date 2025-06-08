import React from 'react';

interface PropsDaEtiqueta {
  texto: React.ReactNode;
  htmlFor?: string;
}

export const Etiqueta = ({ texto, htmlFor }: PropsDaEtiqueta) => {
  return <label htmlFor={htmlFor}>{texto}</label>;
};
