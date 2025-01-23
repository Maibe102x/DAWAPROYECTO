import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

const PasswordRecoveryModal = ({ showModal, onClose }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const recoveryPassword = async () => {
        if (!email || !newPassword) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:1009/user/reset-password', {
                reset_email: email,
                reset_new_password: newPassword,
            });

            if (response.data.result) {
                alert('Contraseña restablecida exitosamente.');
                onClose(); // Cierra el modal
            } else {
                setError(response.data.message || 'Error al restablecer la contraseña.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Un error ha ocurrido.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={showModal} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h6" textAlign="center" gutterBottom>
                    ¿Olvidaste tu contraseña?
                </Typography>
                <Typography variant="body2" textAlign="center" sx={{ marginBottom: '16px' }}>
                    Por favor, ingresa tu correo electrónico y la nueva contraseña.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: '16px' }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Correo electrónico"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Nueva contraseña"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <Button onClick={onClose} sx={{ marginRight: '8px' }} disabled={loading}>
                        Cerrar
                    </Button>
                    <Button
                        onClick={recoveryPassword}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default PasswordRecoveryModal;
