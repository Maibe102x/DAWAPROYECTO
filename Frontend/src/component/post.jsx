import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import { Box, IconButton, Avatar, Typography, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/Bookmark';
import PostEdit from '../component/editPost-modal'
import PostDelete from '../component/deletePost-modal'

const Post = ({ userData, isProfile }) => {
    const [posts, setPosts] = useState([]);
    const [likeState, setLikeState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false)
    const [postId, setPostId] = useState()

    const formatPostTime = (postCreatedAt) => {
        const postDate = new Date(postCreatedAt);
        const now = new Date();
        const minutesDifference = Math.floor((now - postDate) / (1000 * 60)); // Minutos transcurridos
        const hoursDifference = Math.floor((now - postDate) / (1000 * 60 * 60)); // Horas transcurridas

        if (minutesDifference < 60) {
            return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
        } else if (hoursDifference < 24) {
            return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
        } else {
            return format(postDate, 'dd MMMM'); // Formato: Día Mes
        }
    };

    localStorage.removeItem('likeButtonState')

    useEffect(() => {
        const savedState = localStorage.getItem('likeButtonState');
        if (savedState === 'active') {
            setLikeState(true)
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:1010/posts/list`);
                const allPosts = response.data.data;

                if (isProfile) {
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


    const handleClickLike = (postId) => {
        console.log(postId)
        const fetchPosts = async () => {
            try {
                const response = await axios.put("http://localhost:1010/posts/like",{
                    post_id: postId
                })
                if (response.data.result) {
                    // Actualizar los likes localmente
                    setPosts((prevPosts) =>
                        prevPosts.map((post) =>
                            post.post_id === postId
                                ? { ...post, post_likes: post.post_likes + 1 }
                                : post
                        )
                    );
                } else {
                    console.error("Error updating like:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    };

    const handleClick = (event, postId) => {
        setAnchorEl(event.currentTarget); // Abre el menú al hacer clic en el botón
        setPostId(postId);
        console.log(postId)
    };

    const handleClose = () => {
        setAnchorEl(null); // Cierra el menú
    };

    const handleEdit = () => {
        setIsEdit(true);
        console.log('Editar'); // Lógica para editar
        handleClose(); // Cierra el menú después de la acción
    };

    const handleEditClose = () =>{
        setIsEdit(false);
    }

    const handleDelete = () => {
        setIsDelete(true);
        console.log('Borrar'); // Lógica para borrar
        handleClose(); // Cierra el menú después de la acción
    };

    const handleDeleteClose = () =>{
        setIsDelete(false);
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
            {posts.map((post) => (
                <Box
                    key={post.post_id}
                    sx={{
                        width: '100%',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#D9D8D8',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        marginBottom: '20px',
                    }}
                >
                    {/* Contenedor del perfil, input y botón de opciones */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: '10px',
                        }}
                    >
                        {/* Foto de perfil */}
                        
                        <Avatar
                            sx={{
                                width: '50px',
                                height: '50px',
                                marginRight: '10px',
                            }}
                            alt="Perfil"
                            src={isProfile ? userData.image_url : undefined} // Usa la imagen del usuario o la aleatoria
                        />

                        {/* Información del usuario */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography fontWeight="bold" fontSize="14px">
                                {post.u_login}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatPostTime(post.post_created_at)}
                            </Typography>
                        </Box>

                        {/* Icono de opciones */}
                        {isProfile && (
                            <>
                                <IconButton
                                    sx={{
                                        marginLeft: 'auto',
                                        width: '50px',
                                        height: '50px',
                                    }}
                                    onClick={(event) => handleClick(event, post.post_id)}
                                >
                                    <MoreHorizIcon sx={{ width: '100%', height: '100%' }} />
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl} // El ancla para el menú
                                    open={Boolean(anchorEl)} // Si el menú está abierto
                                    onClose={handleClose} // Cierra el menú
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem sx={{color: '#125380'}} onClick={handleEdit}>Editar</MenuItem>
                                    <MenuItem sx={{color: 'red'}} onClick={handleDelete}>Eliminar</MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>

                    
                    {/* Contenido del post */}
                    <Typography
                        variant="body1"
                        sx={{ width: '100%', marginBottom: '10px', textAlign: 'left', paddingX: '10px' }}
                    >
                        {post.post_content}
                    </Typography>

                    {/* Contenedor de la imagen o video publicado */}
                    {post.post_image_url && (
                        <Box
                            sx={{
                                width: '100%',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                marginBottom: '20px',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img
                                src={post.post_image_url}
                                alt="Post"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Box>
                    )}

                    {/* Opciones de interacción (Like, Comentar, Guardar) */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            width: '100%',
                            borderTop: '2px solid #B5B5B5',
                            paddingTop: '10px',
                        }}
                    >
                        {/* Botón de Like */}
                        <IconButton
                            onClick={() => handleClickLike(post.post_id)}
                            sx={{
                                color: likeState ? '#00afe3' : '#405e76',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <FavoriteBorderIcon />
                            <Typography fontSize="12px" color="text.secondary">
                                {post.post_likes}
                            </Typography>
                        </IconButton>

                        {/* Botón de Comentar */}
                        <IconButton
                            sx={{
                                color: '#405e76',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <ChatBubbleOutlineIcon />
                            <Typography fontSize="12px" color="text.secondary">
                                Comentar
                            </Typography>
                        </IconButton>

                        {/* Botón de Guardar */}
                        <IconButton
                            sx={{
                                color: '#405e76',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <BookmarkBorderIcon />
                            <Typography fontSize="12px" color="text.secondary">
                                Guardar
                            </Typography>
                        </IconButton>
                    </Box>
                </Box>
            ))}
            <PostEdit
                open={isEdit}
                onClose={handleEditClose}
                userData={userData}
                postId={postId}
            />
            <PostDelete
                open={isDelete}
                onClose={handleDeleteClose}
                postId={postId}
            />
        </Box>
    );
};

export default Post;
