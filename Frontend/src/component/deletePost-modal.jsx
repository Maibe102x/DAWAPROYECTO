import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import axios from 'axios';

function deletePostModal({ open, onClose, onConfirmDelete, postId }) {

    const handleDelete = () => {
        const deletePost = async () => {
            try {
                const response = await axios.delete(`http://localhost:1010/posts/delete/${postId}`);
                if(response.data.result){
                    window.location.reload()
                }
            } catch (error) {
                console.error("Error delete post:", error);
            }
        };
    
        deletePost(); 
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-post-dialog-title"
            aria-describedby="delete-post-dialog-description"
        >
            <DialogTitle id="delete-post-dialog-title">Confirmar eliminación</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-post-dialog-description">
                    ¿Estás seguro de que deseas eliminar este post? Esta acción no se puede deshacer.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleDelete} color="error" autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default deletePostModal;
