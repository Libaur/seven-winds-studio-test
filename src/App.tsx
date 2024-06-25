import './App.style.scss';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { SidebarItem, sidebarItemsTitles } from './components/SidebarItem';

export function App() {
    return (
        <>
            <Header />
            <Layout interactiveComponent={<div className="interactive-component"></div>}>
                {sidebarItemsTitles.map((title, index) => (
                    <SidebarItem key={index} title={title} />
                ))}
            </Layout>
        </>
    );
}
