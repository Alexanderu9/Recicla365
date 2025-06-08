import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/useAppContext';
import type { Local } from '../../context/types';
import styles from './CadastroLocal.module.css';
import { Mensagem } from '../atoms/Mensagem';

const tiposDisponiveis = [
  'Vidro', 'Metal', 'Papel', 'Plástico', 'Orgânico', 'Baterias'
];

export function CadastroLocal() {
  const { usuario, locais, setLocais } = useAppContext();
  const [local, setLocal] = useState<Partial<Local>>({
    nome: '',
    descricao: '',
    cep: '',
    endereco: '',
    latitude: '',
    longitude: '',
    tiposResiduos: [],
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const localExistente = locais.find(l => String(l.id) === id);
      if (localExistente) {
        setLocal(localExistente);
      }
    }
  }, [searchParams, locais]);

  async function buscarEndereco(cep: string) {
    setLoading(true);
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!resp.ok) throw new Error('Erro de rede');
      const data = await resp.json();
      if (data.erro) {
        setErro('CEP não encontrado.');
        setLocal(l => ({ ...l, endereco: '' }));
        setLoading(false);
        return;
      }
      setLocal(l => ({
        ...l,
        endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
      }));
      setErro('');
    } catch {
      setErro('Erro ao buscar o endereço. Tente novamente mais tarde.');
      setLocal(l => ({ ...l, endereco: '' }));
    }
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setErro('');
    setSucesso('');
    if (type === 'checkbox') {
      setLocal(l => ({
        ...l,
        tiposResiduos: checked
          ? [...(l.tiposResiduos || []), value]
          : (l.tiposResiduos || []).filter(t => t !== value),
      }));
    } else {
      setLocal(l => ({ ...l, [name]: value }));
      if (name === 'cep' && value.length === 8) buscarEndereco(value);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');
    if (
      !local.nome ||
      !local.descricao ||
      !local.cep ||
      !local.endereco ||
      !local.latitude ||
      !local.longitude ||
      !local.tiposResiduos?.length
    ) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    const id = searchParams.get('id');
    if (id) {
      const locaisAtualizados = locais.map(l =>
        String(l.id) === id
          ? { ...l, ...local, tiposResiduos: local.tiposResiduos as string[] }
          : l
      );
      setLocais(locaisAtualizados);
      setSucesso('Local editado com sucesso!');
    } else {
      const novoLocal: Local = {
        ...local,
        id: Date.now(),
        usuarioId: usuario?.cpf || usuario?.email || '',
        tiposResiduos: local.tiposResiduos as string[],
      } as Local;
      setLocais([...locais, novoLocal]);
      setSucesso('Local cadastrado com sucesso!');
    }

    setLocal({
      nome: '',
      descricao: '',
      cep: '',
      endereco: '',
      latitude: '',
      longitude: '',
      tiposResiduos: [],
    });
    setTimeout(() => navigate('/dashboard'), 1200);
  }

 return (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
    <form onSubmit={handleSubmit} className={styles.formContainer} style={{ flex: 1, minWidth: 280 }}>
      <h2>{searchParams.get('id') ? 'Editar' : 'Cadastrar'} Local de Coleta</h2>
      {erro && <Mensagem tipo="erro" texto={erro} />}
      {sucesso && <Mensagem tipo="sucesso" texto={sucesso} />}
      {loading && <Mensagem tipo="sucesso" texto="Carregando endereço..." />}
      <input name="nome" placeholder="Nome do local" value={local.nome || ''} onChange={handleChange} required />
      <input name="descricao" placeholder="Descrição" value={local.descricao || ''} onChange={handleChange} required />
      <input name="cep" placeholder="CEP" value={local.cep || ''} onChange={handleChange} maxLength={8} required />
      <input name="endereco" placeholder="Endereço" value={local.endereco || ''} onChange={handleChange} readOnly />
      <input name="latitude" placeholder="Latitude" value={local.latitude || ''} onChange={handleChange} required />
      <input name="longitude" placeholder="Longitude" value={local.longitude || ''} onChange={handleChange} required />
      <div>
        <b>Tipos de resíduos aceitos:</b>
        {tiposDisponiveis.map(tipo => (
          <label key={tipo} style={{ marginLeft: 8 }}>
            <input
              type="checkbox"
              name="tiposResiduos"
              value={tipo}
              checked={local.tiposResiduos?.includes(tipo) || false}
              onChange={handleChange}
            />
            {tipo}
          </label>
        ))}
      </div>
      <button type="submit">{searchParams.get('id') ? 'Salvar alterações' : 'Cadastrar'}</button>
    </form>
   <img
      src="/public/Reciclavel.jpeg"
      alt="Ponto de coleta de recicláveis"
      style={{ width: '100%', maxWidth: 480, borderRadius: 12, margin: '0 auto' }}
    />
  </div>
);
}