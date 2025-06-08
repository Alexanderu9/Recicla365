import { Login } from './Login';
import { useTheme } from '../../hooks/useTheme';
import styles from './PaginaPrincipal.module.css';

export function PaginaPrincipal() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      
      <button 
        onClick={toggleTheme}
        className={styles.themeToggle}
        title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div className={styles.grid}>
     
        <div className={styles.infoSection}>
          <div className={styles.logoContainer}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2909/2909765.png"
              alt="Logo Recicla365" 
              className={styles.logo}
            />
          </div>
          <h1 className={styles.titulo}>Recicla365</h1>
          <p className={styles.subtitulo}>Por um mundo mais verde e sustentável</p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.icon}>🌱</span>
              <p>Encontre pontos de coleta próximos</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>♻️</span>
              <p>Cadastre novos locais de reciclagem</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>🌍</span>
              <p>Contribua para um planeta mais limpo</p>
            </div>
          </div>
        </div>

        <div className={styles.loginSection}>
          <div className={styles.loginCard}>
            <Login />
          </div>
        </div>

      
        <div className={styles.imageSection}>
          <img 
            src="/reciclaje-principal.webp"
            alt="Natureza e reciclagem" 
            className={styles.mainImage}
          />
          <div className={styles.imageOverlay}>
            <h2>Juntos por um futuro sustentável</h2>
            <p>Cada ação conta na preservação do nosso planeta</p>
          </div>
        </div>
      </div>
    </div>
  );
}