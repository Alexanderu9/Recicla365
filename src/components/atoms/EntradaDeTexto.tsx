import React from 'react';

interface PropsDaEntrada extends React.InputHTMLAttributes<HTMLInputElement> {
    nomePersonalizado?: string;
    tipo: string;
    valor: string;
    aoAlterar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    obrigatorio?: boolean;
  
  }
  
  export const EntradaDeTexto = (props: PropsDaEntrada) => {
    return <input {...props} />;
  };

  