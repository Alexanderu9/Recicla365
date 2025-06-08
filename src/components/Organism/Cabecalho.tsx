import { MenuNavegacao } from './MenuNavegacao';
import { Botao } from '../atoms/Botao';
import { useTheme } from '../../hooks/useTheme';
import styles from './Cabecalho.module.css';


export const Cabecalho = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.cabecalho}>
      <div className={styles.topo}>
        <h1 className={styles.titulo}>Recicla365</h1>
        <div className={styles.acoes}>
          <Botao tipo="button" onClick={toggleTheme}>
            {theme === 'light' ? '🌞' : '🌙'}
          </Botao>
        </div>
      </div>
      <MenuNavegacao />
    </header>
  );
};