import './Header.style.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import ReplyIcon from '@mui/icons-material/Reply';

export default function Header() {
    return (
        <Box flexGrow={1}>
            <AppBar position="static">
                <Toolbar variant="dense" className="toolbar">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <AppsIcon />
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <ReplyIcon />
                    </IconButton>
                    <Typography component="button" className="toolbar-button with-border">
                        Просмотр
                    </Typography>
                    <Typography color="inherit" component="button" className="toolbar-button">
                        Управление
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
