import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/useAppContext';
import styles from './MenuNavegacao.module.css';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/perfil', label: 'Perfil' },
  { to: '/locais', label: 'Locais' },
  { to: '/locais/cadastrar', label: 'Cadastrar Local' },
];

export function MenuNavegacao() {
  const { setUsuario } = useAppContext();
  const navigate = useNavigate();

  function handleLogout() {
    setUsuario(null);
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  }

  return (
    <nav className={styles.menuNav}>
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          end={link.to === '/dashboard' || link.to === '/perfil' || link.to === '/locais'}
        >
          {link.label}
        </NavLink>
      ))}
      <button
        onClick={handleLogout}
        className={styles.sairBtn}
      >
        Sair
      </button>
    </nav>
  );
}