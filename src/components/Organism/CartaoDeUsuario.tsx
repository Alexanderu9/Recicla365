import { Botao } from '../atoms/Botao';

interface PropsDoCartaoDeUsuario {
  nome: string;
  email: string;
  aoEditar: () => void;
  aoSair: () => void;
}

export const CartaoDeUsuario = ({ nome, email, aoEditar, aoSair }: PropsDoCartaoDeUsuario) => {
  return (
    <article style={{ border: '1px solid #aaa', borderRadius: '6px', padding: '1rem', maxWidth: '300px' }}>
      <h2>{nome}</h2>
      <p>{email}</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <Botao tipo="button" onClick={aoEditar}>
          Editar
        </Botao>
        <Botao tipo="button" onClick={aoSair}>
          Sair
        </Botao>
      </div>
    </article>
  );
};
