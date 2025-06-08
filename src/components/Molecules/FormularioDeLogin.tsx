import React, { useState } from 'react';
import { Botao } from '../atoms/Botao';
import { EntradaDeTexto } from '../atoms/EntradaDeTexto';
import { Titulo } from '../atoms/Titulo';

interface PropsFormularioDeLogin {
  aoLogar: (email: string, senha: string) => void;
}

export const FormularioDeLogin = ({ aoLogar }: PropsFormularioDeLogin) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const aoEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    aoLogar(email, senha);
  };

  return (
    <form onSubmit={aoEnviar}>
      <Titulo texto="Login" nivel={2} />
      <EntradaDeTexto
        tipo="email"
        valor={email}
        aoAlterar={e => setEmail(e.target.value)}
        placeholder="Digite seu e-mail"
        obrigatorio={true}
      />
      <EntradaDeTexto
      tipo="password"
      valor={senha}
      aoAlterar={e => setSenha(e.target.value)}
      placeholder="Digite sua senha"
      obrigatorio={true}
/>
      <Botao tipo="submit">Entrar</Botao>
    </form>
  );
};