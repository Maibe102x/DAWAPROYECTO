import React, { useState, useEffect } from 'react';
import PasswordRecoveryModal from '../component/recoverPassword-modal';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        

        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const fetchLogin = async () => {
        try {
            const response = await axios.post('http://localhost:1009/user/login', {
                login_user: email,
                login_password: password,
            });

            if (response.data.result && response.data.data) {
                const { Token,user_id } = response.data.data;
                if (rememberMe) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                }

                onLogin(user_id, Token);
                alert('¡Bienvenido!');
            } else {
                setError(response.data.message || 'Usuario o contraseña incorrectos');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Un error ha ocurrido.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#EDF2F7',
                padding: '20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: '800px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                }}
            >
                {/* Left Section with Logo */}
                <Box
                    sx={{
                        backgroundColor: '#3182CE',
                        color: '#ffffff',
                        width: '40%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                >
                    <img
                        src="images/Logo2.png"
                        alt="Logo"
                        style={{ width: '150px', marginBottom: '20px' }}
                    />
                    <Typography variant="h5" textAlign="center" sx={{ fontWeight: 'bold' }}>
                        ¡Bienvenido de nuevo!
                    </Typography>
                    <Typography variant="body2" textAlign="center" sx={{ marginTop: '10px' }}>
                        Forma parte de una comunidad que te impulsa.
                    </Typography>
                </Box>

                {/* Right Section with Form */}
                <Box
                    sx={{
                        width: '60%',
                        padding: '40px',
                    }}
                >
                    <Typography variant="h4" textAlign="center" gutterBottom color="#2B6CB0">
                        Iniciar Sesión
                    </Typography>
                    {error && (
                        <Typography
                            color="error"
                            variant="body2"
                            sx={{ marginBottom: '16px', textAlign: 'center' }}
                        >
                            {error}
                        </Typography>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            fetchLogin();
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="on"
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            variant="outlined"
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '16px',
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={handleCheckboxChange}
                                        color="primary"
                                    />
                                }
                                label="Recuérdame"
                            />
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => setShowModal(true)}
                            >
                                ¿Olvidaste tu contraseña?
                            </Typography>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                marginTop: '16px',
                                backgroundColor: '#2B6CB0',
                                '&:hover': {
                                    backgroundColor: '#1A202C',
                                },
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>
                </Box>
            </Box>

            {/* Modal for Password Recovery */}
            <PasswordRecoveryModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
            />
        </Box>
    );
};

export default Login;
