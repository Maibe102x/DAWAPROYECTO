import React, { useEffect, useState } from 'react'; 
import Main from '../component/main-content';
import Menu from '../component/left-sidebar';
import RightSidebar from '../component/right-sidebar';
import Header from '../component/header';
import Profile from './profile';
import Chat from './chat';
import axios from "axios";
import { Box } from '@mui/material';

const Home = ({ onLogout }) => {
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({
        image_url: "images/cargando.jpg",
        username: "username",
        email: "username@edu.ug.ec",
        password: "password",
        modified: ""
    });
    const [isProfile, setIsProfile] = useState(false);
    const [isChat, setIsChat] = useState(false);
    const [secondUserId,setSecondUserId] = useState()
    const [secondUserData, setSecondUserData] = useState({
        image_url: "images/cargando.jpg",
        username: "username",
        email: "username@edu.ug.ec",
        password: "password",
        modified: ""
    });
    const [idChat, setIdChat] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setIsChat(localStorage.getItem('isChat') === 'true' || false);
        setUserId(storedUserId);
    }, [userId]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:1008/user/data/${userId}`);
                    if (response.data.result) {
                        setUserData((prevData) => {
                            // Solo actualiza si los datos son diferentes para evitar un bucle
                            if (JSON.stringify(prevData) !== JSON.stringify(response.data.data)) {
                                return response.data.data;
                            }
                            return prevData; // No actualices si los datos no han cambiado
                        });
                    } else {
                        console.log("Usuario no encontrado.");
                    }
                } catch (err) {
                    console.log("Error al obtener los datos del usuario:", err);
                }
            }
        };
    
        fetchUserData();
    }, [userId, userData]); // userData y userId como dependencias
    

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await axios.get(`http://localhost:1011/chat/created/${userId}/${secondUserId}`);
                if (response.data.result && response.data.data) {
                    setIdChat(response.data.data.chat_id);
                    console.log('Chat encontrado')
                } else {
                    console.log('Chat no encontrado')
                    setIdChat(0);
                }
            } catch (err) {
                console.error("Error en obtener el chat entre ambos usuarios: ", err);
            }
        };

        if (userId && secondUserId) fetchChat();
    }, [userId, secondUserId,idChat]);



    console.log('idChat: ' + idChat)

    const handleProfile = (isProfile) => setIsProfile(isProfile);
    const handleChat = (isChat) => {
        setIsChat(isChat);
        localStorage.setItem('isChat', isChat);
    };

    useEffect(() => {
        console.log(console.log("Datos del usuario:", JSON.stringify(userData, null, 2)));
        console.log("Datos del usuario han cambiado:", userData);
    }, [userData]);

    useEffect(() => {
        console.log("Id del segundo usuario a cambiado:", secondUserId);
    }, [secondUserId]);

    return (
        <>
            <Header setSecondUserId={setSecondUserId} idChat = {idChat} setIdChad={setIdChat}/>
            <Menu onLogout={onLogout} userData={userData} onProfile={handleProfile} onChat={handleChat} />
            {isProfile || isChat
                ? (isChat
                    ? <Chat userData={userData} secondUserId={secondUserId} idChat={idChat}/>
                    : <Profile userData={userData} setUserData={setUserData}/>)
                : <Main userData={userData} />}
            <RightSidebar />
        </>
    );
};

export default Home;
