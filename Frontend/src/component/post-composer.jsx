import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import axios from "axios";
import { Box, TextField, IconButton, Avatar } from '@mui/material';
import { Picker } from 'emoji-mart';
import SendIcon from '@mui/icons-material/Send';
import Icon1 from '@mui/icons-material/EmojiEmotions';
import Icon2 from '@mui/icons-material/Image';
import Icon3 from '@mui/icons-material/VideoLibrary';

const PostComposer = ({ userData, isProfile }) => { // Asegúrate de recibir los props correctamente
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        content: "",       // Contenido del post
        imageUrl: "",      // URL de la imagen del post
        likes: 0,       // Número de likes (inicialmente null)  
    });
    
    const isButtonDisabled = !newPost.content && !newPost.imageUrl;


    useEffect(() => {
        console.log(userData)
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:1010/posts/list`);
                const allPosts = response.data.data;

                if (isProfile) {
                    // Filtrar los posts para el usuario logueado
                    setPosts(allPosts.filter(post => post.u_login === userData.username));
                } else {
                    setPosts(allPosts);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [userData, isProfile]);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:1010/posts/create", {
                u_login: userData.username,
                post_content: newPost.content,
                post_likes: newPost.likes,
                post_image_url: newPost.imageUrl,
            });

            if (response.data.result) {
                console.log("ENTRE :D");
                setPosts([response.data.data, ...posts]); // Añadir el nuevo post a la parte superior
                setNewPost({ content: "", imageUrl: "", likes: 0 }); // Restablecer el formulario
                window.location.reload(); // Recargar la página
            } else {
                console.error("Error creating post:", response.data.message);
                window.alert("Error al crear post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            console.log("Error al crear post");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prevState => ({ ...prevState, [name]: value })); // Usar función de actualización basada en el estado anterior
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name; // Obtener el nombre del archivo
            setNewPost(prevState => ({ ...prevState, imageUrl: `images/${fileName}` })); // Guardar el nombre del archivo en el estado
            console.log(`images/${fileName}`);
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
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                width: '100%',
                paddingX: '10px',
                paddingY: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#D9D8D8',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            onSubmit={handlePostSubmit}
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
                <IconButton
                    sx={{
                        marginLeft: 'auto',
                        width: '50px',
                        height: '50px',
                        cursor: isButtonDisabled ? 'not-allowed' : 'pointer', // Cursor de no permitido si está deshabilitado
                    }}
                    type="submit"
                    disabled={isButtonDisabled} // Deshabilitar el botón si no hay texto ni imagen
                >
                    <SendIcon sx={{ color: isButtonDisabled ? '#b0b0b0' : '#3b7ddd', width: '100%', height: '100%' }} />
                </IconButton>
            </Box>

            {/* Mostrar la imagen seleccionada */}
            {newPost.imageUrl && (
                <Box sx={{ marginY: '10px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <img
                        src={newPost.imageUrl}
                        alt="Post Preview"
                        style={{ maxWidth: '100%', borderRadius: '8px' }}
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

            {/* Input invisible para elegir imagen */}
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
        </Box>
    );
};

export default PostComposer;
