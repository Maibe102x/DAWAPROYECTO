import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography,Avatar } from '@mui/material';
import axios from 'axios';
import MessageList from '../component/messagesList';
import MessageInput from '../component/message-input';

const Chat = ({ userData, secondUserId , idChat}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const messagesEndRef = useRef(null);
    const [secondUserData, setSecondUserData] = useState();
    

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(parseInt(storedUserId, 10))
    }, [userId]);

    useEffect(()=>{
        console.log(secondUserId)
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:1008/user/data/${secondUserId}`);
                if (response.data.result) {
                    setSecondUserData(response.data.data);
                    console.log(response.data.data)
                } else {
                    console.error("User not found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        if (secondUserId)  fetchUserData()
    },[secondUserId])

    useEffect(() => {
        console.log(idChat)
        const handleCreateMessage = async () => {
            try {
                const response = await axios.post(`http://localhost:1011/chat/conversations/${idChat}/messages`, {
                    sender_user: userId,
                    message_content: messages,
                });
    
                if (response.data.result && response.data.data) {
                    console.log('mensaje creado con éxito');
                    
                    
                } else {
                    console.log("No se obtuvo resultado para crear chat de usuarios");
                }
            } catch (error) {
                console.log("Error al crear mensaje");
            }
        };
        handleCreateMessage()
    }, [messages])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = (event) => {
        
        if (event.key === 'Enter') {
            event.preventDefault();
            setMessages(message);
            setMessage("");
            console.log( 'mensaje vacio?'+ message)
        }
        console.log(messages)
    };

    const calculateWidth = (text) => Math.min(text.length * 20, 400);

    return (
        <>
            {/* Header */}
            <Box sx={{
                background: '#29354c',
                left: 408,
                right: 408,
                width: '624px',
                height: '60px',
                position: 'fixed',
                zIndex: 1200,
                padding: '10px',
            }}>
                <Box display="flex">
                    <Avatar src={secondUserData?.image_url} ></Avatar>
                    <Typography sx={{ fontSize: '28px', color: '#F7FAFC', fontWeight: '500', ml: '10px' }}>
                        {secondUserData?.username || "Username"}
                    </Typography>
                </Box>
            </Box>

            {/* Chat container */}
            <Box sx={{
                position: 'absolute',
                top: '60px',
                left: 408,
                right: 408,
                width: '624px',
                height: 'calc(100% - 140px)',
                backgroundColor: '#718096',
                paddingX: '20px',
                paddingY: '30px',
                zIndex: 1030,
                overflowY: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
            }}>
                <MessageList 
                    messages={messages} 
                    calculateWidth={calculateWidth} 
                    userData={userData} 
                    idChat={idChat} 
                    secondUserData={secondUserData}
                    ref={messagesEndRef} 
                />
            </Box>

            {/* Footer */}
            <Box sx={{
                background: '#78889f',
                bottom: 0,
                left: 408,
                right: 408,
                width: '624px',
                height: '80px',
                position: 'fixed',
                zIndex: 1200,
                padding: '10px',
                borderTop: '2px solid rgb(169, 190, 214)',
            }}>
                <MessageInput
                    msg={message}
                    handleMessageChange={(e) => setMessage(e.target.value)}
                    handleSendMessage={handleSendMessage}
                    idChat={idChat}
                    
                />
            </Box>
        </>
    );
};

export default Chat;
