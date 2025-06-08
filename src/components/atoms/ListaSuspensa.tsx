import React from 'react';

interface Opcao {
  texto: string;
  valor: string;
}

interface PropsDaLista extends React.SelectHTMLAttributes<HTMLSelectElement> {
  opcoes: Opcao[];
}

export const ListaSuspensa = ({ opcoes, ...props }: PropsDaLista) => {
  return (
    <select {...props}>
      {opcoes.map((opcao) => (
        <option key={opcao.valor} value={opcao.valor}>
          {opcao.texto}
        </option>
      ))}
    </select>
  );
};