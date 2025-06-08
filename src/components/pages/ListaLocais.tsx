import { useAppContext } from '../../context/useAppContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Mensagem } from '../atoms/Mensagem';
import styles from './ListaLocais.module.css';

export function ListaLocais() {
  const { locais, setLocais } = useAppContext();
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  function handleEditar(id: number) {
    setSucesso('');
    setErro('');
    navigate(`/locais/cadastrar?id=${id}`);
  }

  function handleAcessar(id: number) {
    setSucesso(`Acessando local com ID: ${id}`);
    setTimeout(() => setSucesso(''), 2000);
  }

  function handleDeletar(id: number) {
    setSucesso('');
    setErro('');
    if (window.confirm('Tem certeza que deseja deletar este local?')) {
      const novosLocais = locais.filter(l => l.id !== id);
      setLocais(novosLocais);
      localStorage.setItem('locais', JSON.stringify(novosLocais));
      setSucesso('Local deletado com sucesso!');
      setTimeout(() => setSucesso(''), 2000);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Locais de Coleta</h2>
      {erro && <Mensagem tipo="erro" texto={erro} />}
      {sucesso && <Mensagem tipo="sucesso" texto={sucesso} />}
      {locais.length === 0 && <div>Nenhum local cadastrado.</div>}
     <ul className={styles.lista}>
  {locais.map(local => (
    <li key={local.id} className={styles.item}>
      <img
        className="imagem-local"
        src="/public/Reciclavel.jpeg"
        alt="Ponto de coleta de recicláveis"
        width={700}
        height={500}
      />
      <div>
        <strong>{local.nome}</strong> <br />
        <span>{local.descricao}</span> <br />
        <span><b>Endereço:</b> {local.endereco}</span> <br />
        <span><b>Tipos:</b> {local.tiposResiduos?.join(', ')}</span>
      </div>
      <div className={styles.botoes}>
        <button onClick={() => handleAcessar(local.id)}>Acessar</button>
        <button onClick={() => handleEditar(local.id)}>Editar</button>
        <button onClick={() => handleDeletar(local.id)} style={{ background: '#e53935', color: '#fff' }}>Deletar</button>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}