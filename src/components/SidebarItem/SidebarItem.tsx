import './Sidebaritem.style.scss';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function SidebarItem({ title }: { title: string }) {
    const isMarked = title === 'СМР' ? 'item-marked' : '';
    return (
        <ListItem disablePadding className={isMarked}>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon className="sidebar-item" />
                    <ListItemText primary={title} className="sidebar-item" />
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    );
}
