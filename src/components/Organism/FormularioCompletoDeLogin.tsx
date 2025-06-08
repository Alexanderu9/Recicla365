import { FormularioDeLogin } from '../Molecules/FormularioDeLogin';

interface PropsDoFormularioCompletoDeLogin {
  aoLogar: (email: string, senha: string) => void;
}

export const FormularioCompletoDeLogin = ({ aoLogar }: PropsDoFormularioCompletoDeLogin) => {
  return (
    <section style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
      <FormularioDeLogin aoLogar={aoLogar} />
    </section>
  );
};
