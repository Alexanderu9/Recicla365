import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mensagem } from '../atoms/Mensagem';
import { useAppContext } from '../../context/useAppContext';
import type { Usuario } from '../../context/types';

const inicial: Usuario = {
  nome: '',
  sexo: '',
  cpf: '',
  dataNascimento: '',
  email: '',
  senha: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  estado: '',
  numero: '',
  endereco: '',
};

function normalizarCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

export function CadastroUsuario() {
  const { setUsuarios } = useAppContext();
  const [usuario, setUsuario] = useState<Usuario>(inicial);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  async function buscarEndereco(cep: string) {
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await resp.json();
      if (data.erro) {
        setErro('CEP não encontrado');
        setUsuario(u => ({
          ...u,
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: '',
        }));
        return;
      }
      setUsuario(u => ({
        ...u,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      }));
      setErro('');
    } catch {
      setErro('Erro ao buscar CEP');
    }
  }

  function cpfOuEmailEhUnico(cpf: string, email: string) {
    const cpfNormalizado = normalizarCpf(cpf);
    const usuariosSalvos: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const cpfExiste = usuariosSalvos.some(
      (u) => normalizarCpf(u.cpf || '') === cpfNormalizado
    );

    const emailExiste = usuariosSalvos.some(
      (u) => (u.email || '').trim().toLowerCase() === email.trim().toLowerCase()
    );

    return { cpfExiste, emailExiste, usuariosSalvos };
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setUsuario(u => ({ ...u, [name]: value }));
    setErro('');
    setSucesso('');
    if (name === 'cep' && value.length === 8) {
      buscarEndereco(value);
    }
  }

  function handleVoltar() {
    navigate('/');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (
      !usuario.nome ||
      !usuario.sexo ||
      !usuario.cpf ||
      !usuario.dataNascimento ||
      !usuario.email ||
      !usuario.senha ||
      !usuario.cep ||
      !usuario.logradouro ||
      !usuario.bairro ||
      !usuario.cidade ||
      !usuario.estado
    ) {
      setErro('Preencha todos os campos obrigatórios.');
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const { cpfExiste, emailExiste, usuariosSalvos } = cpfOuEmailEhUnico(usuario.cpf, usuario.email);

    if (cpfExiste) {
      setErro('CPF já cadastrado.');
      alert('🚫 CPF JÁ CADASTRADO! Não é possível cadastrar.');
      return;
    }

    if (emailExiste) {
      setErro('E-mail já cadastrado.');
      alert('🚫 E-MAIL JÁ CADASTRADO! Não é possível cadastrar.');
      return;
    }

    const enderecoCompleto = `${usuario.logradouro}, ${usuario.numero || ''} - ${usuario.bairro}, ${usuario.cidade} - ${usuario.estado}, CEP: ${usuario.cep}`;
    const novoUsuario: Usuario = { 
      ...usuario, 
      cpf: normalizarCpf(usuario.cpf), 
      endereco: enderecoCompleto 
    };
    
    const novaLista = [...usuariosSalvos, novoUsuario];
    setUsuarios(novaLista);
    localStorage.setItem('usuarios', JSON.stringify(novaLista));

    setSucesso('Usuário cadastrado com sucesso!');
    alert('✅ Usuário cadastrado com sucesso!');

    setTimeout(() => {
      setSucesso('');
      navigate('/dashboard');
    }, 1000);

    setUsuario(inicial);
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      {/* Botão de Voltar */}
      <button 
        type="button"
        onClick={handleVoltar}
        style={{
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.background = '#5a6268'}
        onMouseOut={e => e.currentTarget.style.background = '#6c757d'}
      >
        ← Voltar
      </button>

      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Usuário</h2>
        {erro && <Mensagem tipo="erro" texto={erro} />}
        {sucesso && <Mensagem tipo="sucesso" texto={sucesso} />}
        
        <input 
          name="nome" 
          placeholder="Nome Completo" 
          value={usuario.nome} 
          onChange={handleChange} 
          required 
          autoComplete="name"
        />
        
        <select name="sexo" value={usuario.sexo} onChange={handleChange} required>
          <option value="">Sexo</option>
          <option value="F">Feminino</option>
          <option value="M">Masculino</option>
          <option value="O">Outro</option>
        </select>
        
        <input 
          name="cpf" 
          placeholder="CPF" 
          value={usuario.cpf} 
          onChange={handleChange} 
          maxLength={14} 
          required 
          autoComplete="off"
        />
        
        <input 
          name="dataNascimento" 
          type="date" 
          value={usuario.dataNascimento} 
          onChange={handleChange} 
          required 
          autoComplete="bday"
        />
        
        <input 
          name="email" 
          type="email" 
          placeholder="E-mail" 
          value={usuario.email} 
          onChange={handleChange} 
          required 
          autoComplete="email"
        />
        
        <input 
          name="senha" 
          type="password" 
          placeholder="Nova Senha" 
          value={usuario.senha} 
          onChange={handleChange} 
          required 
          autoComplete="new-password"
        />
        
        <input 
          name="cep" 
          placeholder="CEP" 
          value={usuario.cep} 
          onChange={handleChange} 
          maxLength={8} 
          required 
          autoComplete="postal-code"
        />
        
        <input 
          name="logradouro" 
          placeholder="Logradouro" 
          value={usuario.logradouro} 
          onChange={handleChange} 
          readOnly 
        />
        
        <input 
          name="bairro" 
          placeholder="Bairro" 
          value={usuario.bairro} 
          onChange={handleChange} 
          readOnly 
        />
        
        <input 
          name="cidade" 
          placeholder="Cidade" 
          value={usuario.cidade} 
          onChange={handleChange} 
          readOnly 
        />
        
        <input 
          name="estado" 
          placeholder="Estado" 
          value={usuario.estado} 
          onChange={handleChange} 
          readOnly 
        />
        
        <input 
          name="numero" 
          placeholder="Número" 
          value={usuario.numero || ''} 
          onChange={handleChange} 
          autoComplete="address-line2"
        />
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="submit"
            style={{ flex: 1 }}
          >
            Cadastrar
          </button>
          <button 
            type="button"
            onClick={handleVoltar}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6em 1.2em',
              fontSize: '1em',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#c82333'}
            onMouseOut={e => e.currentTarget.style.background = '#dc3545'}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}