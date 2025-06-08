export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  sexo: string;
  dataNascimento: string;
  endereco: string;
  cep: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  numero?: string;

};

export type Local = {
  id: number;
  usuarioId: string;
  nome: string;
  cidade: string;
  estado: string;
  cep: string;
  tipo: string;
  descricao: string;
  endereco: string;
  tiposResiduos: string[];
  latitude: string;
  longitude: string;
};

export type AppContextType = {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  locais: Local[];
  setLocais: React.Dispatch<React.SetStateAction<Local[]>>;
};
