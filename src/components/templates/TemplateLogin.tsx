import React from 'react';
import { Titulo } from '../atoms/Titulo';

interface PropsTemplateLogin {
  children: React.ReactNode;
}

export const TemplateLogin = ({ children }: PropsTemplateLogin) => {
  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '6px' }}>
      <Titulo texto="Bem-vindo! Faça seu login" nivel={2} />
      {children}
    </div>
  );
};
