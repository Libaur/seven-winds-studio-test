import './App.style.scss';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { SidebarItem, sidebarItemsTitles } from './components/SidebarItem';
import { Worksheet } from './components/Worksheet';

export function App() {
   return (
      <>
         <Header />
         <Layout interactiveComponent={<Worksheet />}>
            {sidebarItemsTitles.map((title, index) => (
               <SidebarItem key={index} title={title} />
            ))}
         </Layout>
      </>
   );
}
