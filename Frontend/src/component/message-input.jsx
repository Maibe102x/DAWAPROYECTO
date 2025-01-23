import React, {useState,useEffect} from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import axios from 'axios';

const MessageInput = ({ msg, handleMessageChange, handleSendMessage}) => {

    const [userId,setUserId] = useState()
    useEffect(() => {
        // Obtén el userId desde localStorage al cargar la página
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
        console.log('userId: ' + userId);
    }, [userId]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e); // Lógica para enviar el mensaje
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', margin: '2px' }}>
            <TextField
                variant="outlined"
                placeholder="Escribe un mensaje"
                fullWidth
                value={msg}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown} // Maneja la tecla Enter
                multiline
                minRows={1}
                maxRows={2}
                
                InputProps={{
                    startAdornment: (
                        <IconButton style={{ padding: 0, marginRight: '15px' }}>
                            <AddReactionIcon style={{ color: '#657786' }} />
                        </IconButton>
                    ),
                    style: {
                        borderRadius: '9999px',
                        backgroundColor: '#f5f8fa',
                        fontSize: '16px',
                        padding: '10px 15px',
                        height: 'auto',
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#e1e8ed',
                        },
                        '&:hover fieldset': {
                            borderColor: '#cfd9de',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1da1f2',
                            boxShadow: '0 0 0 2px rgba(29, 161, 242, 0.3)',
                        },
                    },
                    '& input::placeholder': {
                        color: '#657786',
                    },
                }}
            />
        </Box>
    );
};

export default MessageInput;