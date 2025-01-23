import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Typography,
    Box,
} from '@mui/material';
import { styled } from '@mui/system';

const SidebarMenuItem = styled(ListItem)(({ theme }) => ({
    padding: '3px',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .075)',
        borderLeft: '3px solid #3b7ddd',
    },
}));

const RightSidebar = ({ contacts = [], communities = [] }) => {
    const contactos = [
        {
            "id": 1,
            "name": "Sofía Martínez",
            "avatar": "images/Perfil.jpg",
            "status": "En línea",
            "university": "Universidad Nacional",
            "lastMessage": "¿Terminaste el proyecto?",
        },
        {
            "id": 2,
            "name": "Carlos López",
            "avatar": "images/Perfil.jpg",
            "status": "En línea",
            "university": "Instituto Tecnológico",
            "lastMessage": "¡Gracias por la ayuda!",
        },
        {
            "id": 3,
            "name": "Ana Gómez",
            "avatar": "images/Perfil.jpg",
            "status": "En línea",
            "university": "Universidad de Monterrey",
            "lastMessage": "¿Tienes el link del evento?",
        },
        {
            "id": 4,
            "name": "Jorge Pérez",
            "avatar": "images/Perfil.jpg",
            "status": "En línea",
            "university": "Universidad Autónoma",
            "lastMessage": "Nos vemos en clase mañana.",
        },
        {
            "id": 5,
            "name": "Lucía Fernández",
            "avatar": "images/Perfil.jpg",
            "status": "Desconectado",
            "university": "Universidad Politécnica",
            "lastMessage": "Revisé el material, está genial.",
        },
    ];
    const comunidades = [{
        "id": 1,
        "name": "Club de Programación",
        "image": "images/Perfil.jpg",
        "members": 150,
        "description": "Aprende y colabora en proyectos de desarrollo de software.",
    },
    {
        "id": 2,
        "name": "Círculo de Literatura",
        "image": "images/Perfil.jpg",
        "members": 80,
        "description": "Explora libros, comparte reseñas y discute tus obras favoritas.",
    },
    {
        "id": 3,
        "name": "EcoEstudiantes",
        "image": "images/Perfil.jpg",
        "members": 120,
        "description": "Un espacio para promover la sostenibilidad y el cuidado del medio ambiente.",
    },
    {
        "id": 4,
        "name": "Matemáticas Avanzadas",
        "image": "images/Perfil.jpg",
        "members": 95,
        "description": "Colabora y resuelve problemas matemáticos de nivel avanzado.",
    },
    {
        "id": 5,
        "name": "Club de Emprendedores",
        "image": "images/Perfil.jpg",
        "members": 200,
        "description": "Comparte ideas y aprende sobre emprendimiento y negocios.",
    },];

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '60px',
                right: 0,
                width: '455px',
                height: 'calc(100vh - 60px)',
                backgroundColor: '#125380',
                color: '#ffffff',
                padding: '10px',
                zIndex: '1',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box>
                {/* Contactos Conectados */}
                <Typography variant="h6" sx={{ color: '#ffffff', marginBottom: '10px', marginLeft: '20px' }}>
                    Contactos Recientes
                </Typography>
                <List>
                    {contactos.map((contact) => (
                        <SidebarMenuItem key={contact.id}>
                            <ListItem>
                                <ListItemIcon>
                                    <Avatar src={contact.avatar} alt={contact.name} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={contact.name}
                                    secondary={`${contact.status}`}
                                    primaryTypographyProps={{
                                        style: { fontSize: '16px', fontWeight: 'bold', color: '#FFFFFF' },
                                    }}
                                    secondaryTypographyProps={{
                                        style: {
                                            fontSize: '14px',
                                            color: contact.status === "En línea" ? '#3b7ddd' : '#CCCCCC',
                                        },
                                    }}
                                />
                            </ListItem>
                        </SidebarMenuItem>
                    ))}
                </List>

                {/* Sugerencias de Comunidades */}
                <Typography
                    variant="h6"
                    sx={{ color: '#ffffff', marginTop: '20px', marginBottom: '10px', marginLeft: '20px' }}
                >
                    Sugerencias de Comunidades
                </Typography>
                <List>
                    {comunidades.map((community) => (
                        <SidebarMenuItem key={community.id}>
                            <ListItemIcon>
                                <Avatar src={community.image} alt={community.name} />
                            </ListItemIcon>
                            <ListItemText
                                primary={community.name}
                                secondary={community.description}
                                primaryTypographyProps={{
                                    style: { color: '#ffffff', fontWeight: 'bold' },
                                }}
                                secondaryTypographyProps={{
                                    style: { color: '#c9d1d9' },
                                }}
                            />
                        </SidebarMenuItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default RightSidebar;
