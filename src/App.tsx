import './App.style.scss';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { SidebarItem, sidebarItemsTitles } from './components/SidebarItem';
import Table from './components/Worksheet/Worksheet';

export function App() {
   return (
      <>
         <Header />
         <Layout interactiveComponent={<Table />}>
            {sidebarItemsTitles.map((title, index) => (
               <SidebarItem key={index} title={title} />
            ))}
         </Layout>
      </>
   );
}
