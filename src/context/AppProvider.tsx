import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AppContext } from './AppContext';
import type { Usuario, Local } from './types';

interface AppProviderProps {
  children: ReactNode;
}

const USUARIOS_INICIAIS: Usuario[] = [
  { nome: "Maria", email: "maria@teste.com", senha: "123", cpf: "11111111111", sexo: "F", dataNascimento: "1990-01-01", endereco: "Rua A, 100", cep: "01001000" },
  { nome: "João", email: "joao@teste.com", senha: "123", cpf: "22222222222", sexo: "M", dataNascimento: "1985-02-02", endereco: "Rua B, 200", cep: "01002000" },
  { nome: "Ana", email: "ana@teste.com", senha: "123", cpf: "33333333333", sexo: "F", dataNascimento: "1992-03-03", endereco: "Rua C, 300", cep: "01003000" },
  { nome: "Carlos", email: "carlos@teste.com", senha: "123", cpf: "44444444444", sexo: "M", dataNascimento: "1988-04-04", endereco: "Rua D, 400", cep: "01004000" },
  { nome: "Paula", email: "paula@teste.com", senha: "123", cpf: "55555555555", sexo: "F", dataNascimento: "1995-05-05", endereco: "Rua E, 500", cep: "01005000" }
];

export const AppProvider = ({ children }: AppProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [locais, setLocais] = useState<Local[]>([]);

  useEffect(() => {
    let usuariosSalvos = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];
    
    if (usuariosSalvos.length === 0) {
      usuariosSalvos = USUARIOS_INICIAIS;
      localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));
    }
    
    setUsuarios(usuariosSalvos);

    const locaisSalvos = JSON.parse(localStorage.getItem('locais') || '[]') as Local[];
    setLocais(locaisSalvos);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null') as Usuario | null;
    setUsuario(usuarioLogado);
  }, []);


  useEffect(() => {
    localStorage.setItem('locais', JSON.stringify(locais));
  }, [locais]);

  useEffect(() => {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }, [usuario]);

  return (
    <AppContext.Provider value={{ usuario, setUsuario, usuarios, setUsuarios, locais, setLocais }}>
      {children}
    </AppContext.Provider>
  );
};