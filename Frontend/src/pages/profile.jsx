import React, { useState, useEffect} from "react";
import { Box } from '@mui/material';
import HeaderProfile from '../component/header-profile'
import Post from '../component/post'

const Profile = ({userData, setUserData}) => {

    const defaultUserData = {
        image_url: "images/cargando.jpg",
        username: "username",
        email: "email",
        career: "Ingenieria de Software",
    };
    
    const safeUserData = userData || defaultUserData;
    const canEditProfile = !!userData;

    return (
        <>
            <Box
                sx={{
                    position: 'absolute', // Para usar coordenadas x, y
                    top: 0,
                    left: 408, // Margen izquierdo
                    right: 408, // Margen derecho
                    width: 624, // Ancho
                    height: '100%', // Altura máxima
                    backgroundColor: '#EDF2F7', // Color de fondo
                    zIndex:1001
                }}
            >
                <Box>
                    <HeaderProfile 
                        userData = {safeUserData} 
                        canEdit={canEditProfile} 
                        setUserData={setUserData}
                    />
                </Box>
            </Box>
            
            <Box
                sx={{
                    position: 'absolute', // Para usar coordenadas x, y
                    top: 240,
                    left: 408, // Margen izquierdo
                    right: 408, // Margen derecho
                    width: 624, // Ancho
                    height: '100%', // Altura máxima
                    paddingX: '50px',
                    paddingY: '30px',
                    zIndex: 1002
                }}
            >
                <Box sx={{
                    marginTop: '40px' 
                }}>
                    <Post userData = {userData} isProfile = {true} />
                </Box>
            </Box>
        </>
    );
};

export default Profile;
