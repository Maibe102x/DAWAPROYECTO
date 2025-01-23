import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import axios from "axios";
import { Box, TextField, IconButton, Avatar, Modal, Button, Typography } from '@mui/material';
import { Picker } from 'emoji-mart';
import SendIcon from '@mui/icons-material/Send';
import Icon1 from '@mui/icons-material/EmojiEmotions';
import Icon2 from '@mui/icons-material/Image';
import Icon3 from '@mui/icons-material/VideoLibrary';


function PostEdit({ open, onClose, userData, postId }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [postData, setPostData] = useState([]);
    const [newPost, setNewPost] = useState({
        content: '',       // Contenido del post
        imageUrl: '',      // URL de la imagen del post  
    });
    const [userId, setUserId] = useState()
    const [username, setUsername] = useState('')


    useEffect(() => {
        // Obtén el userId desde localStorage al cargar la página
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
        console.log(userId);
    }, []);

    useEffect(() => {
        // Obtén el userId desde localStorage al cargar la página
        if (!userData) {
            console.log("userData no está disponible, no se hará la llamada a la API");
            return; // Si userData no está disponible, no se ejecuta el código de abajo
        }
        const getPost = async () =>{
            try {
                setUsername(userData.username)
                const response = await axios.get(`http://localhost:1010/posts/${username}/${postId}`);
    
                if (response.data.result) {
                    setPostData(response.data.data)

                } else {
                    console.error("Error get post:", response.data.message);
                    window.alert("Error al obtener el post");
                }
            } catch (error) {
                console.error("Error get post:", error);
                console.log("Error al obtener el post");
            }
        }
        getPost();
    }, [username, postId,userData]);

    useEffect(() => {
        console.log(postData)
        if (postData && (postData.content || postData.image_url)) {
            setNewPost({
                content: postData.content,       // Contenido del post
                imageUrl: postData.image_url,    // URL de la imagen del post
            });
        }
    }, [postData]);

    console.log(`newpost: ${JSON.stringify(newPost)}`);

    const handlePostEdit = async (e) => {
        try {
            const response = await axios.put(`http://localhost:1010/posts/update/${postId}`, {
                u_login: username,
                post_content: newPost.content,
                post_image_url: newPost.imageUrl,
            });

            if (response.data.result) {
                window.location.reload()
            } else {
                console.error("Error update post:", response.data.message);
                window.alert("Error al actualizar el post");
            }
        } catch (error) {
            console.error("Error update post:", error);
            console.log("Error al actualizar el post");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prevState => ({ ...prevState, [name]: value })); // Usar función de actualización basada en el estado anterior
        console.log(newPost)
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name; // Obtener el nombre del archivo
            setNewPost(prevState => ({ ...prevState, imageUrl: `images/${fileName}` })); // Guardar el nombre del archivo en el estado
        }
    };

    const handleIconClick = (index) => {
        if (index === 0) {
            setShowEmojiPicker(!showEmojiPicker); // Mostrar el picker de emojis
        } else if (index === 1) {
            document.getElementById('fileInput').click(); // Abrir el explorador de archivos para elegir imagen
        } else if (index === 2) {
            alert('No es posible insertar GIFs porque tenemos una patata de servidor T-T');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 624,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
                onSubmit={handlePostEdit}
            >
                {/* Contenedor del perfil, input y botón de post */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        borderBottom: '2px solid #B5B5B5',
                        paddingBottom: '10px',
                    }}
                >
                    <Avatar
                        sx={{
                            width: '50px',
                            height: '50px',
                            marginRight: '10px',
                        }}
                        src={userData?.image_url || 'images/cargando.jpg'}
                        alt="Perfil"
                    />

                    <TextField
                        id="outlined-textarea"
                        placeholder="¿Qué quieres compartir hoy?"
                        multiline
                        minRows={1}
                        maxRows={4}
                        sx={{
                            width: '500px',
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#B5B5B5',
                            },
                        }}
                        name="content"
                        value={newPost.content}
                        onChange={handleInputChange}
                    />
                </Box>

                {/* Mostrar la imagen seleccionada */}
                {newPost.imageUrl && (
                    <Box sx={{ marginY: '10px', display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%', height: '400px'}}>
                        <img
                            src={newPost.imageUrl}
                            alt="Post Preview"
                            style={{ maxWidth: '100%', borderRadius: '8px'}}
                        />
                    </Box>
                )}

                {/* Contenedor de Iconos */}
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        marginTop: '5px',
                    }}
                >
                    {[Icon1, Icon2, Icon3].map((Icon, index) => {
                        const colors = ['#c18f13', '#46a871', '#d33725'];
                        return (
                            <IconButton
                                key={index}
                                sx={{
                                    width: '30px',
                                    height: '30px',
                                    marginX: '5px',
                                    color: colors[index],
                                }}
                                onClick={() => handleIconClick(index)}
                            >
                                <Icon />
                            </IconButton>
                        );
                    })}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                    <Button variant="outlined" onClick={onClose} color="#3a405c">
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={handlePostEdit} color="primary">
                        Guardar
                    </Button>
                </Box>

                {/* Input invisible para elegir imagen */}
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </Box>
        </Modal>
    );
}

export default PostEdit;