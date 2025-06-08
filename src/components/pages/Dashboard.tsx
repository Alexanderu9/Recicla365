import React from 'react';
import styles from './Dashboard.module.css';
import { useAppContext } from '../../context/useAppContext';
import type { Local } from '../../context/types';

function Card({ children, style }: React.PropsWithChildren<{ style?: React.CSSProperties }>) {
  return (
    <div
      style={{
        borderRadius: 8,
        padding: 16,
        background: 'var(--card, #fff)',
        boxShadow: '0 2px 8px #0001',
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function LocalCard({ local }: { local: Local }) {
  return (
    <Card style={{ marginBottom: 12, border: '1px solid #ccc' }}>
      <strong>{local.nome}</strong>
      <div>{local.descricao}</div>
      <div>
        <b>Endereço:</b> {local.endereco}
      </div>
      <div>
        <b>Tipos de resíduos:</b> {local.tiposResiduos?.join(', ')}
      </div>
    </Card>
  );
}

export function Dashboard() {
  const { usuarios, locais } = useAppContext();

  return (
    <div className={styles.container}>
      <h2>Dashboard</h2>
      <img
  src="/Reciclavel.jpeg"
  alt="Natureza ecológica"
  style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }}
/>
      <div className={styles.cardsGrid}>
        <Card style={{ background: 'var(--primary-light)', textAlign: 'center' }}>
          <h3 style={{ color: '#222' }}>Usuários ativos</h3>
          <span style={{ fontSize: 32, fontWeight: 'bold' }}>{usuarios.length}</span>
        </Card>
        <Card style={{ background: 'var(--accent)', textAlign: 'center' }}>
          <h3 style={{ color: '#222' }}>Locais cadastrados</h3>
          <span style={{ fontSize: 32, fontWeight: 'bold' }}>{locais.length}</span>
        </Card>
      </div>

      <h3>Locais de Coleta</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {locais.length === 0 && <li style={{ color: '#999' }}>Nenhum local cadastrado.</li>}
        {locais.map(local => (
          <li key={local.id}>
            <LocalCard local={local} />
          </li>
        ))}
      </ul>
    </div>
  );
}