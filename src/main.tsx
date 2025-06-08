import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppProvider';
import { ThemeProvider } from './theme';

import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <AppProvider>
      <App />
    </AppProvider>
    </ThemeProvider>
  </StrictMode>
);