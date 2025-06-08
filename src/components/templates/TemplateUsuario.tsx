import React from 'react';
import { Rodape } from '../Organism/Rodape';
import { Cabecalho } from '../Organism/Cabecalho';

interface PropsTemplateUsuario {
  children: React.ReactNode;
  aoSair: () => void;
}

export const TemplateUsuario = ({ children}: PropsTemplateUsuario) => {
  return (
    <>
<Cabecalho />
<main style={{
  padding: '1rem',
  minHeight: '80vh',
  background: 'linear-gradient(120deg, #fff 60%, #b6fcb6 100%)', 
  borderRadius: 16,
}}>
  {children}
</main>
      <Rodape />
    </>
  );
};