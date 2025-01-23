import React from 'react';
import { Box } from '@mui/material';
import PostComposer from './post-composer';
import Post from './post';

const Main = ({userData,isProfile}) => {
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
                    paddingX: '50px',
                    paddingY: '30px',
                    position: 'fixed',
                    zIndex: 1001,
                }}
            >
            </Box>
            <Box
                sx={{
                    position: 'absolute', // Para usar coordenadas x, y
                    top: 0,
                    left: 408, // Margen izquierdo
                    right: 408, // Margen derecho
                    width: 624, // Ancho
                    height: '100%', // Altura máxima
                    paddingX: '50px',
                    paddingY: '30px',
                    zIndex: 1002
                }}
            >
                <Box>
                    <PostComposer userData = {userData} isProfile = {isProfile}/>
                </Box>
                <Box sx={{
                    marginTop: '40px' 
                }}>
                    <Post userData = {userData} isProfile = {isProfile}/>
                </Box>
            </Box>
        </>
        
        
    );
};

export default Main;