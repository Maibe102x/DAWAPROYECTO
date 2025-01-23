import React, { forwardRef, useEffect, useState } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import axios from 'axios';
import { ms } from 'date-fns/locale';

const MessagesList = forwardRef(({ messages, calculateWidth, userData, idChat, secondUserData }, messagesEndRef) => {
    const [userId, setUserId] = useState();
    const [allMessages, setAllMessages] = useState([]);

    // Obtener userId desde localStorage
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, [userId]);

    // Efecto para obtener mensajes del servidor
    useEffect(() => {
        if (idChat) {
            const fetchUserMessages = async () => {
                try {
                    const response = await axios.get(`http://localhost:1011/chat/user/conversations/${idChat}`);
                    if (response.data.result) {
                        if (Array.isArray(response.data.data)) {
                            setAllMessages(response.data.data);
                        } else {
                            console.log("La respuesta no es una lista.");
                        }
                    } else {
                        console.log("Mensajes no encontrados.");
                    }
                } catch (err) {
                    console.log("Error al obtener los mensajes del usuario.");
                }
            };

            fetchUserMessages();
        }
    }, [idChat]);  // Solo se ejecuta cuando idChat cambia

    // Efecto para manejar el mensaje entrante
    useEffect(() => {
        if (messages && messages.trim() !== '') {
            setAllMessages(prevMessages => [...prevMessages, { message_content: messages }]);
        }
    }, [messages]);  // Se ejecuta cada vez que 'messages' cambia

    return (
        <>
        {allMessages && (
                allMessages.map((msg, index) => (<>
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            marginBottom: '10px',
                            justifyContent: msg.sender_id == userId || msg.sender_id == undefined  ? 'flex-start' : 'flex-end', // Condición para alinear el mensaje
                        }}
                    >
                        {msg.sender_id == userId || msg.sender_id == undefined ? (
                            // Si el mensaje es del usuario actual, mostrar en el lado izquierdo
                            <>
                                
                                {/* Avatar */}
                                <Avatar
                                    src={userData?.image_url || "images/cargando.jpg"}
                                    alt="User Avatar"
                                    sx={{ marginRight: '10px', width: '40px', height: '40px' }}
                                />
                                {/* Message bubble */}
                                <Box
                                    sx={{
                                        backgroundColor: '#F7FAFC',
                                        color: '#000',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        maxWidth: '100%',
                                        width: `${calculateWidth(msg.message_content)}px`, // Dynamic width based on text length
                                        textAlign: 'left',
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    <Typography>{msg.message_content}</Typography>
                                </Box>
                            </>
                        ) : (
                            // Si el mensaje es del otro usuario, mostrar en el lado derecho
                            <>
                                
                                {/* Message bubble */}
                                <Box
                                    sx={{
                                        backgroundColor: '#E1F5FE', // Color de fondo para los mensajes del otro usuario
                                        color: '#000',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        maxWidth: '100%',
                                        width: `${calculateWidth(msg.message_content)}px`, // Dynamic width based on text length
                                        textAlign: 'right',
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    <Typography>{msg.message_content}</Typography>
                                </Box>
                                {/* Avatar */}
                                <Avatar
                                    src={secondUserData?.image_url || "images/cargando.jpg"}
                                    alt="User Avatar"
                                    sx={{ marginLeft: '10px', width: '40px', height: '40px' }}
                                />
                            </>
                        )}
                    </Box>
                </>
                ))
            )}

            <div ref={messagesEndRef} />
        </>
    );
});

export default MessagesList;
