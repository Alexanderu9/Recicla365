import React, { useState } from 'react';
import { Botao } from '../atoms/Botao';
import { EntradaDeTexto } from '../atoms/EntradaDeTexto';
import { Titulo } from '../atoms/Titulo';

interface PropsFormularioDeCadastro {
  aoCadastrar: (nome: string, email: string, senha: string) => void;
}

export const FormularioDeCadastro = ({ aoCadastrar }: PropsFormularioDeCadastro) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const aoEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    aoCadastrar(nome, email, senha);
  };

  return (
    <form onSubmit={aoEnviar}>
      <Titulo texto="Cadastro" nivel={2} />
      <EntradaDeTexto
        tipo="text"
        valor={nome}
        aoAlterar={e => setNome(e.target.value)}
        placeholder="Digite seu nome"
        obrigatorio
      />
      <EntradaDeTexto
        tipo="email"
        valor={email}
        aoAlterar={e => setEmail(e.target.value)}
        placeholder="Digite seu e-mail"
        obrigatorio
      />
      <EntradaDeTexto
        tipo="password"
        valor={senha}
        aoAlterar={e => setSenha(e.target.value)}
        placeholder="Digite sua senha"
        obrigatorio
      />
      <Botao tipo="submit">Cadastrar</Botao>
    </form>
  );
};
