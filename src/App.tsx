import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/useAppContext';
import { PaginaPrincipal } from './components/pages/PaginaPrincipal';
import { Dashboard } from './components/pages/Dashboard';
import { Perfil } from './components/pages/Perfil';
import { CadastroUsuario } from './components/pages/CadastroUsuario';
import { CadastroLocal } from './components/pages/CadastroLocal';
import { ListaLocais } from './components/pages/ListaLocais';
import { TemplatePrincipal } from './components/templates/TemplatePrincipal';
import { TemplateUsuario } from './components/templates/TemplateUsuario';

export const App = () => {
  const { usuario, setUsuario } = useAppContext();

  function handleLogout() {
    setUsuario(null);
    localStorage.removeItem('usuarioLogado');
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal estilosa */}
        <Route path="/" element={usuario ? <Navigate to="/dashboard" /> : <PaginaPrincipal />} />

        <Route
          path="/dashboard"
          element={
            usuario ? (
              <TemplatePrincipal aoSair={handleLogout}>
                <Dashboard />
              </TemplatePrincipal>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/locais"
          element={
            usuario ? (
              <TemplatePrincipal aoSair={handleLogout}>
                <ListaLocais />
              </TemplatePrincipal>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/locais/cadastrar"
          element={
            usuario ? (
              <TemplatePrincipal aoSair={handleLogout}>
                <CadastroLocal />
              </TemplatePrincipal>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/perfil"
          element={
            usuario ? (
              <TemplateUsuario aoSair={handleLogout}>
                <Perfil />
              </TemplateUsuario>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="/cadastro" element={<CadastroUsuario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;