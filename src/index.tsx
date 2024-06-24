import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(<App />);
