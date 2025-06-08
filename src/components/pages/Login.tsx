import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/useAppContext';
import type { Usuario } from '../../context/types';


export function Login() {
  const { setUsuario } = useAppContext();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    const usuariosSalvos: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuariosSalvos.find(
      (u: Usuario) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      setErro('E-mail ou senha inválidos.');
      return;
    }

    setUsuario(usuario);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    navigate('/dashboard');
  }

  return (
     <form
    onSubmit={handleSubmit}
    style={{
      maxWidth: 400,
      width: '100%',
      margin: '0 auto',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 4px 24px #0002',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center',
    }}
  >
      <h2>Login</h2>
      {erro && <div style={{ color: 'red', marginBottom: 8 }}>{erro}</div>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => { setEmail(e.target.value); setErro(''); }}
        autoComplete="username"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => { setSenha(e.target.value); setErro(''); }}
        autoComplete="current-password"
        required
      />
      <button type="submit">Entrar</button>
       <div style={{ marginTop: 10 }}>
        <a
          href="/cadastro"
          style={{
            color: '#388e3c',
            fontWeight: 600,
            textDecoration: 'underline',
            transition: 'color 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.color = '#1b5e20')}
          onMouseOut={e => (e.currentTarget.style.color = '#388e3c')}
        >
          Não tem conta? Cadastre-se
        </a>
      </div>
    </form>
  );
}