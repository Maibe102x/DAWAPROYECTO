import React, {useState} from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore} from '@mui/icons-material';
import { styled} from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';

const SidebarMenuItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .075)',
        borderLeft: '3px solid #3b7ddd',
    },
    ...('home' && {
        backgroundColor: 'rgba(255, 255, 255, .075)',
        borderLeft: '3px solid #3b7ddd',
    }),
}));

const Menu = () => {
    const [activeItem, setActiveItem] = useState('home');


    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <>
            {/* Navigation */}
                {/* Menú principal */}
                <SidebarMenuItem
                    button
                    style={{
                        marginLeft: '20px',
                        marginBottom: '20px',
                        cursor: 'pointer',
                        backgroundColor: activeItem === 'home' ? 'rgba(255, 255, 255, .2)' : 'transparent',
                        borderLeft: activeItem === 'home' ? '3px solid #3b7ddd' : 'none',
                    }}
                    onClick={() => handleItemClick('home')}
                >
                    <ListItemIcon
                        style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <i className="bi bi-house-fill" style={{ fontSize: '40px', color: '#F7FAFC' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Home"
                        style={{ marginLeft: '25px' }}
                        primaryTypographyProps={{ style: { fontSize: '20px', color: '#F7FAFC' } }}
                    />
                </SidebarMenuItem>

                <SidebarMenuItem
                    button
                    style={{
                        marginLeft: '20px',
                        marginBottom: '20px',
                        cursor: 'pointer',
                        backgroundColor: activeItem === 'home' ? 'rgba(255, 255, 255, .2)' : 'transparent',
                        borderLeft: activeItem === 'home' ? '3px solid #3b7ddd' : 'none',
                    }}
                    onClick={() => handleItemClick('home')}
                >
                    <ListItemIcon
                        style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <PersonIcon sx={{fontSize: '40px', color: '#F7FAFC'}}></PersonIcon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Perfil"
                        style={{ marginLeft: '25px' }}
                        primaryTypographyProps={{ style: { fontSize: '20px', color: '#F7FAFC' } }}
                    />
                </SidebarMenuItem>

                <SidebarMenuItem
                    button
                    style={{
                        marginLeft: '20px',
                        marginBottom: '20px',
                        cursor: 'pointer',
                        backgroundColor: activeItem === 'home' ? 'rgba(255, 255, 255, .2)' : 'transparent',
                        borderLeft: activeItem === 'home' ? '3px solid #3b7ddd' : 'none',
                    }}
                    onClick={() => handleItemClick('home')}
                >
                    <ListItemIcon
                        style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <i className="bi bi-chat-fill" style={{ fontSize: '40px', color: '#F7FAFC' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Chat"
                        style={{ marginLeft: '25px' }}
                        primaryTypographyProps={{ style: { fontSize: '20px', color: '#F7FAFC' } }}
                    />
                </SidebarMenuItem>

                <SidebarMenuItem button style={{ marginLeft: '20px', marginBottom: '20px', cursor: 'pointer' }}>
                    <ListItemIcon style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="bi bi-gear-fill" style={{ fontSize: '40px', color: '#F7FAFC' }} /> {/* Icono del menú */}
                    </ListItemIcon>
                    <ListItemText primary="Comunidades" style={{ marginLeft: '25px' }} primaryTypographyProps={{ style: { fontSize: '20px', color: '#F7FAFC' } }} />
                </SidebarMenuItem>
                <SidebarMenuItem button style={{ marginLeft: '20px', marginBottom: '20px', cursor: 'pointer' }}>
                    <ListItemIcon style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="bi bi-bookmarks-fill" style={{ fontSize: '40px', color: '#F7FAFC' }} /> {/* Icono del menú */}
                    </ListItemIcon>
                    <ListItemText primary="Guardado" style={{ marginLeft: '25px' }} primaryTypographyProps={{ style: { fontSize: '20px', color: '#F7FAFC' } }} />
                </SidebarMenuItem>
        </>
    );
};

export default Menu;