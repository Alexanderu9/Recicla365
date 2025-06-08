import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/useAppContext';
import type { Usuario } from '../../context/types';
import styles from './Perfil.module.css';
import { Mensagem } from '../atoms/Mensagem';

export function Perfil() {
  const { usuario, setUsuario, usuarios, setUsuarios } = useAppContext();
  const [editando, setEditando] = useState(false);

  const [dados, setDados] = useState<Usuario>(
    usuario ?? {
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
      endereco: ''
    }
  );

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);

  // Atualiza 'dados' sempre que o 'usuario' mudar
  useEffect(() => {
    if (usuario) {
      setDados(usuario);
    }
  }, [usuario]);

  async function buscarEndereco(cep: string) {
    setLoading(true);
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!resp.ok) {
        throw new Error('Erro de rede');
      }
      const data = await resp.json();
      if (data.erro) {
        setErro('CEP não encontrado.');
        setDados(d => ({
          ...d,
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: '',
          endereco: ''
        }));
        setLoading(false);
        return;
      }
      setDados(d => ({
        ...d,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        endereco: `${data.logradouro || ''}, ${data.bairro || ''}, ${data.localidade || ''} - ${data.uf || ''}`
      }));
      setErro('');
    } catch {
      setErro('Erro ao buscar o endereço. Tente novamente mais tarde.');
      setDados(d => ({
        ...d,
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        endereco: ''
      }));
    }
    setLoading(false);
  }

  if (!usuario) {
    return <div style={{ color: 'red' }}>Nenhum usuário logado.</div>;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setDados(d => ({ ...d, [name]: value }));
    setErro('');
    setSucesso('');
    if (name === 'cep' && value.length === 8) {
      buscarEndereco(value);
    }
  }

  function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (
      !dados.nome ||
      !dados.sexo ||
      !dados.cpf ||
      !dados.dataNascimento ||
      !dados.email
    ) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    setUsuario(dados);
    const usuariosAtualizados = usuarios.map(u =>
      u.cpf === usuario!.cpf ? { ...u, ...dados } : u
    );
    setUsuarios(usuariosAtualizados);
    localStorage.setItem('usuarioLogado', JSON.stringify(dados));
    setSucesso('Dados atualizados com sucesso!');
    setEditando(false);
  }

  function handleCancelar() {
    setDados(usuario!);
    setErro('');
    setSucesso('');
    setEditando(false);
  }

  return (
    <div className={styles.profileContainer}>
      <h2>Perfil do Usuário</h2>

      {erro && <Mensagem tipo="erro" texto={erro} />}
      {sucesso && <Mensagem tipo="sucesso" texto={sucesso} />}
      {loading && <Mensagem tipo="sucesso" texto="Carregando endereço..." />}

      <form onSubmit={handleSalvar}>
        <input
          name="nome"
          placeholder="Nome"
          value={dados.nome}
          onChange={handleChange}
          disabled={!editando}
          required
        />
        <select
          name="sexo"
          value={dados.sexo}
          onChange={handleChange}
          disabled={!editando}
          required
        >
          <option value="">Sexo</option>
          <option value="F">Feminino</option>
          <option value="M">Masculino</option>
          <option value="O">Outro</option>
        </select>
        <input
          name="cpf"
          placeholder="CPF"
          value={dados.cpf}
          onChange={handleChange}
          disabled
          required
        />
        <input
          name="dataNascimento"
          type="date"
          value={dados.dataNascimento}
          onChange={handleChange}
          disabled={!editando}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={dados.email}
          onChange={handleChange}
          disabled={!editando}
          required
        />
        <input
          name="cep"
          placeholder="CEP"
          value={dados.cep}
          onChange={handleChange}
          disabled={!editando}
          maxLength={8}
        />
        <input
          name="logradouro"
          placeholder="Logradouro"
          value={dados.logradouro}
          onChange={handleChange}
          disabled={!editando}
        />
        <input
          name="bairro"
          placeholder="Bairro"
          value={dados.bairro}
          onChange={handleChange}
          disabled={!editando}
        />
        <input
          name="cidade"
          placeholder="Cidade"
          value={dados.cidade}
          onChange={handleChange}
          disabled={!editando}
        />
        <input
          name="estado"
          placeholder="Estado"
          value={dados.estado}
          onChange={handleChange}
          disabled={!editando}
        />

        {editando ? (
          <>
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleCancelar} style={{ marginLeft: '1rem' }}>
              Cancelar
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setEditando(true)}>
            Editar
          </button>
        )}
      </form>
    </div>
  );
}
