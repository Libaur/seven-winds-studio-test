import './App.style.scss';
import { Header } from './components/Header';
import { Backbone } from './components/Backbone';
import { SidebarItem, sidebarItemsTitles } from './components/SidebarItem';

export function App() {
    return (
        <>
            <Header />
            <Backbone interactiveComponent={<div className="interactive-component"></div>}>
                {sidebarItemsTitles.map((title, index) => (
                    <SidebarItem key={index} title={title} />
                ))}
            </Backbone>
        </>
    );
}
