import './Layout.style.scss';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface LayoutProps {
    children: ReactNode;
    interactiveComponent?: ReactNode;
}

export default function Layout({ children, interactiveComponent }: LayoutProps) {
    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex">
                <Toolbar className="project-title">
                    Название проекта
                    <br />
                    Аббревиатура
                    <KeyboardArrowDownIcon className="arrow-icon" />
                </Toolbar>
                <Toolbar className="subheader">
                    <h3>Строительно-монтажные работы</h3>
                </Toolbar>
            </Box>
            <Box display="flex" flexGrow={1}>
                <Box className="sidebar" flexShrink={0}>
                    <List>{children}</List>
                </Box>
                <Box flexGrow={1} display="flex" justifyContent="flex-end">
                    {interactiveComponent}
                </Box>
            </Box>
        </Box>
    );
}
