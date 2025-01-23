import React, { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import axios from "axios";

const StyledImagePreview = styled('img')({
    width: '150px',
    height: '150px',
    borderRadius: '100%',
    marginBottom: '20px',
});

const EditProfileModal = ({ open, onClose, userData, setUserData }) => {
    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(userData.image_url);
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(parseInt(storedUserId, 10))
    }, [userId]);

    useEffect(() => {
                console.log(console.log("Datos del usuario en editProfile:", JSON.stringify(userData, null, 2)));
            }, [userData]);

    const handleProfileEdit = async () => {
        try {
            // Crea un objeto con los datos actualizados del usuario
            const updatedUser = {
                ...userData, // Mantén los datos actuales
                username,    // Actualiza el nombre de usuario
                email,  // Actualiza el correo electrónico
            };
    
            // Realiza la llamada a la API para actualizar los datos
            const response = await axios.put(`http://localhost:1008/user/update/data/${userId}`, {
                u_login: username,
                u_email: email,
                u_state: true,
            });
    
            if (response.data.result) {
                // Si la actualización en el servidor fue exitosa, usa los datos del servidor
                const updatedDataFromServer = response.data.data;
    
                console.log("Datos del servidor antes de actualizar:", updatedDataFromServer);
                setUserData(updatedDataFromServer)
                // Actualiza el estado global con los datos del servidor
                
    
                // Cierra el modal
                onClose();
            } else {
                console.error("Error updating user:", response.data.message);
                window.alert("Error updating user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            window.alert("Error updating user");
        }
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            setSelectedImage(fileName);
            setImagePreview(`images/${fileName}`);
        }
    };

    const handlesImageEdit = async(e) => {
        try {
            const response = await axios.post(`http://localhost:1008/user/update/photo/${userId}`, {
                image_url: imagePreview,
            });

            if (response.data.result) {
                const updatedDataFromServer = response.data.data;
    
                console.log("Datos del servidor antes de actualizar:", updatedDataFromServer);
                setUserData(updatedDataFromServer)
            } else {
                console.error("Error update image:", response.data.message);
                window.alert("Error al actualizar imagen de usuario");
            }
        } catch (error) {
            console.error("Error update image:", error);
            console.log("Error al actualizar imagen de usuario");
        }
    };

    const handleSaveChanges = () => {
        handleProfileEdit();
        handlesImageEdit();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Editar Perfil</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box justifyContent='center' display='flex'>
                    {imagePreview && <StyledImagePreview src={imagePreview} alt="Vista previa" />}
                </Box>

                <Button variant="outlined" component="label" fullWidth sx={{ marginBottom: '10px' }}>
                    Subir Foto de Perfil
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Nombre de Usuario" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField label="Correo Electrónico" variant="outlined" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                    <Button variant="outlined" onClick={onClose} color="#3a405c">Cancelar</Button>
                    <Button variant="contained" onClick={handleSaveChanges} color="primary">Guardar</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditProfileModal;
