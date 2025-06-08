import React from 'react';

export const CaixaDeSelecao = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="checkbox" {...props} />;
};
