import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    FilledInput,
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import UserSearchField from './userSearch';


const Logo = styled('img')(() => ({
    marginLeft: '130px',
    transition: 'width 0.3s ease',
    width: '150px',
    height: '50px',
}));

const Header = ({ setSecondUserId, idChat, setIdChad}) => {
    console.log('idChat en header: ' + idChat)
    return (
        <>
            <Box sx={{
                background: '#1A202C',
                width: '100%',
                height: '60px',
                display: 'flex',
                position: 'fixed',
                zIndex: 1000
            }}>
                <Box sx={{padding: '5px',}}>
                    <Logo src='/images/Logo1.0.png' alt="Logo" />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '400px',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        maxWidth: '600px', // Tamaño máximo del contenedor
                        marginLeft: 'auto', // Centrado horizontal
                        marginRight: '50px',
                        position: 'relative'
                    }}
                >
                    {/* Campo de búsqueda */}
                    
                    <UserSearchField setSecondUserId={setSecondUserId} idChat={idChat} setIdChad={setIdChad}/>
                </Box>
            </Box>
        </>
    );
};

export default Header;


