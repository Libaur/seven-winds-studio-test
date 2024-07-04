import './App.style.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { SidebarItem, SIDEBAR_ITEMS_TITLES } from './components/SidebarItem';
import { Worksheet } from './components/Worksheet';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Layout interactiveComponent={<Worksheet />}>
        {SIDEBAR_ITEMS_TITLES.map((title, index) => (
          <SidebarItem key={index} title={title} />
        ))}
      </Layout>
    </ThemeProvider>
  );
}
