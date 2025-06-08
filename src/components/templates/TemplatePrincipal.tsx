import React from 'react';
import { Cabecalho } from '../Organism/Cabecalho';
import { Rodape } from '../Organism/Rodape';

interface PropsTemplatePrincipal {
  children: React.ReactNode;
  aoSair: () => void;
}

export const TemplatePrincipal = ({ children }: PropsTemplatePrincipal) => {
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