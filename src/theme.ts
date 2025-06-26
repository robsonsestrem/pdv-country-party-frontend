import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff9f0', // Fundo geral
      paper: '#fffde7',   // Cards
    },
    primary: {
      main: '#1976d2',    // Botões "Adicionar"
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6f00',    // Header
    },
    success: {
      main: '#388e3c',    // Botão Finalizar
    },
    warning: {
      main: '#ffe0b2',    // Footer (laranja claro)
    },
    text: {
      primary: '#5d4037', // Títulos, textos visíveis
      secondary: '#2e7d32', // Troco
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
