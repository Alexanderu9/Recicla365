type MensagemProps = {
  tipo: 'erro' | 'sucesso';
  texto: string;
};

export function Mensagem({ tipo, texto }: MensagemProps) {
  return (
    <div
      style={{
        color: tipo === 'erro' ? '#b71c1c' : '#1b5e20',
        background: tipo === 'erro' ? '#ffcdd2' : '#c8e6c9',
        border: `1px solid ${tipo === 'erro' ? '#b71c1c' : '#388e3c'}`,
        borderRadius: 4,
        padding: '8px 12px',
        marginBottom: 12,
        fontWeight: 500,
        fontSize: 15,
        textAlign: 'center',
      }}
    >
      {texto}
    </div>
  );
}