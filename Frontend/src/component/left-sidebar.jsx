import React, {useState, useEffect } from 'react';
import axios from "axios";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    Collapse,
    Menu as MuiMenu,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
    Box,Avatar, Paper
} from '@mui/material';
import { ExpandLess, ExpandMore} from '@mui/icons-material';
import { styled} from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';


const SidebarContainer = styled(Drawer)(({ theme}) => ({
    '& .MuiDrawer-paper': {
        backgroundColor: '#125380',
        overflow: 'hidden',
        color: '#ffffff',
        transition: 'all .25s ease-in-out',
        overflowX: 'hidden',
        marginTop: '155px',
        marginBottom: '200px',
        marginLeft: '30px',
        borderRadius: '30px',
        height: '600px',
        width: '350px',
        zIndex: 1
    },
}));

const Perfil = styled('img')(() => ({
    margin: '0 auto',
}));


const ToggleButton = styled(IconButton)(({ theme }) => ({
    color: '#ffffff',
    fontSize: '1.5rem',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .075)',
    },
}));

const SidebarMenuItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .075)',
        borderLeft: '3px solid #3b7ddd',
    },
}));

const DropdownMenu = styled(MuiMenu)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#0e2238',
        color: '#ffffff',
    },
}));

const Menu = ({ onLogout, userData, onProfile, onChat }) => {
    const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);


    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);
        console.log(localStorage.getItem('authToken'));
    };
    
    const handleConfirmLogout = async() => {
        try {
            setLogoutDialogOpen(false);
            onLogout()
            // Obtener el token del usuario
            const token = localStorage.getItem("authToken"); 
            console.log(token)
            if (!token) {
                console.error("No se encontró el token de autenticación.");
                
                return;
            }

            // Llamada al backend
            const response = await axios.post("http://localhost:1009/user/logout", { token });

            if (response.data.result) {
                console.log("Cierre de sesión exitoso:", response.data.message);
                localStorage.removeItem("authToken"); // Elimina el token
                onLogout(); // Notifica al componente padre
            } else {
                console.error("Error al cerrar sesión:", response.data.message);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
    
    const handleCancelLogout = () => {
        setLogoutDialogOpen(false);
    };

    return (
        <>
            <div style={{
                position: 'fixed', // Cambiar a 'fixed' para mantenerlo en la misma posición en la ventana
                left: '40px',
                top: '70px',
                zIndex: 600,
                padding: 2,
                width: 300,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
            }}
            >
                <Avatar
                src={userData?.image_url || 'images/cargando.jpg'}
                    alt="Foto de Perfil"
                    sx={{
                        width: 100,
                        height: 100,
                        marginRight: 2,
                    }}
                />
                <Box>
                    <Typography fontWeight="bold" fontSize="14px">
                        {(userData?.username) || 'username'}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {(userData?.email) || 'email'}
                    </Typography>
                </Box>
            </div>

            <SidebarContainer variant="permanent">
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>

                    {/* Navigation */}
                    <List style={{ marginTop: '50px' }}>
                        {/* Menú principal */}
                        <SidebarMenuItem button style={{ marginLeft: '20px', marginBottom: '20px',  cursor: 'pointer'}} onClick={() =>{onProfile(false);onChat(false)}}>
                            <ListItemIcon style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <i className="bi bi-house-fill" style={{ fontSize: '40px', color: '#F7FAFC' }} /> {/* Icono del menú */}
                            </ListItemIcon>
                            <ListItemText primary="Home" style={{ marginLeft: '25px' }} primaryTypographyProps={{ style: { fontSize: '20px', color: '#F7FAFC' } }} />
                        </SidebarMenuItem>
                        <SidebarMenuItem button style={{ marginLeft: '20px', marginBottom: '20px', cursor: 'pointer' }} onClick={() =>{onProfile(true);onChat(false)}}>
                            <ListItemIcon style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <PersonIcon sx={{fontSize: '40px', color: '#F7FAFC'}}></PersonIcon>
                            </ListItemIcon>
                            <ListItemText primary="Perfil" style={{ marginLeft: '25px' }} primaryTypographyProps={{ style: { fontSize: '20px', color: '#F7FAFC' } }} />
                        </SidebarMenuItem>

                        {/* Menú con submenú */}
                        <SidebarMenuItem button onClick={() => {onProfile(false);onChat(true)}} style={{ marginLeft: '20px', marginBottom: '20px', paddingRight: '40px', cursor: 'pointer' }}>
                            <ListItemIcon style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <i className="bi bi-chat-fill" style={{ fontSize: '40px', color: '#F7FAFC' }} /> {/* Icono del menú */}
                            </ListItemIcon>
                            <ListItemText primary="Chat" style={{ marginLeft: '25px' }} primaryTypographyProps={{ style: { fontSize: '20px', color: '#F7FAFC' } }} />
                        </SidebarMenuItem>

                        {/* Otro menú principal */}
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
                    </List>


                    {/* Cerrar Sesion */}
                    <div
                        style={{
                            height: '10%', // Ocupa el 10% del contenedor
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 'auto',
                        }}
                    >
                        <Button
                            onClick={handleLogoutClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                textTransform: 'none',
                                padding: '10px',
                                width: '100%', // Ancho del botón
                                transition: 'all 0.3s ease-in-out',
                                backgroundColor: ' #2668a2'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.querySelector('.icon').style.color = '#ECF0F1'; // Ícono en blanco
                                e.currentTarget.querySelector('.text').style.color = '#ECF0F1'; // Texto en blanco
                                e.currentTarget.querySelector('.text').style.textDecoration = 'underline'; // Subrayado
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.querySelector('.icon').style.color = '#BDC3C7'; // Ícono gris claro
                                e.currentTarget.querySelector('.text').style.color = '#BDC3C7'; // Texto gris claro
                                e.currentTarget.querySelector('.text').style.textDecoration = 'none'; // Sin subrayado
                            }}
                        >
                            <ListItemIcon
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    transition: 'color 0.3s ease-in-out',
                                }}
                            >
                                <i className="bi bi-box-arrow-right icon" style={{ fontSize: '40px', color: '#BDC3C7' }} /> {/* Icono de Logout */}
                            </ListItemIcon>
                            <Typography
                                variant="body1"
                                className="text"
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#BDC3C7',
                                    marginLeft: '5px',
                                    fontSize: '20px',
                                    transition: 'color 0.3s ease-in-out',
                                }}
                            >
                                Cerrar Sesion
                            </Typography>
                        </Button>
                    </div>
                </div>
            </SidebarContainer>
             {/* Modal de Confirmación */}
            <Dialog
                open={isLogoutDialogOpen}
                onClose={handleCancelLogout}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">Confirmar Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description">
                        ¿Estás seguro de que deseas cerrar sesión?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelLogout} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmLogout} color="error" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        
    );
};

export default Menu;



