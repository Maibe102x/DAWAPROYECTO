import React, { useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, List, ListItem, Typography, Avatar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { WindowSharp } from '@mui/icons-material';

const UserSearchField = ({ setSecondUserId, idChat, setIdChad }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [secondId,setSecondId] = useState()
    
    // Obtener valores del localStorage
    function getFromLocalStorage(key) {
        return localStorage.getItem(key) ? parseInt(localStorage.getItem(key), 10) : null;
    }

    const handleClick = (newUserId) => {
        setSecondUserId(newUserId);
        setSecondId(newUserId);
        CreateChat()
        setIdChad(null)
        console.log(newUserId)
        console.log(userId)
        
    };

    const handleSearch = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get('http://localhost:1008/user/search', {
                params: { q: term },
            });
            setSearchResults(response.data.data || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    };

    const CreateChat = async () => {
        
        console.log( 'idChat en userSeach: ' + idChat)
        if(!idChat){
            try {
                const response = await axios.post('http://localhost:1011/chat/conversations', {
                    user_1: userId,
                    user_2: secondId
                });
                if (response.data.result) {
                    setIdChad(-1);
                    console.log('Chat Creado con exito')
                } else {
                    console.error("Chat no puedo ser Creado");
                }
            } catch (error) {
                console.error('erro al crear el chat:', error);
                setSearchResults([]);
            }
        }
    };

    

    return (
        <div style={{ position: 'relative', width: '100%', zIndex: 1000 }}>
            <TextField
                variant="outlined"
                placeholder="Buscar usuario"
                autoComplete="off"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon style={{ color: '#657786' }} />
                        </InputAdornment>
                    ),
                    style: {
                        borderRadius: '9999px',
                        backgroundColor: '#f5f8fa',
                        fontSize: '16px',
                        padding: '10px 15px',
                        height: '40px',
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
            {searchResults.length > 0 && (
                <List
                    style={{
                        position: 'absolute',
                        top: '45px',
                        left: '0',
                        width: '100%',
                        backgroundColor: '#f5f8fa',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        zIndex: 2000,
                        maxHeight: '200px',
                        overflowY: 'auto',
                    }}
                >
                    {searchResults.map((user) => (
                        <Box display="flex" margin="8px" key={user.u_id}>
                            <Avatar src={user.u_image_url} sx={{ marginRight: '3px' }} />
                            <ListItem button sx={{ cursor: 'pointer' }} onClick={() => handleClick(user.u_id)}>
                                <Typography sx={{ fontWeight: 'bold' }}>{user.u_login}</Typography>
                            </ListItem>
                        </Box>
                    ))}
                </List>
            )}
        </div>
    );
};

export default UserSearchField;
