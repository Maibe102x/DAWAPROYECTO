import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalProfileEdit from "./editProfile-modal";

const HeaderProfile = ({ userData, canEdit, setUserData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const career = userData?.carrer || 'Ingenieria de Software';

    const handleEditClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
            console.log(console.log("Datos del usuario en headerProfile:", JSON.stringify(userData, null, 2)));
        }, [userData]);

    return (
        <>
            <Box sx={{ height: "270px", backgroundColor: "#1A202C", width: "624px", padding: "12px" }}>
                <Box sx={{ width: 600, display: "flex", alignItems: "center", borderRadius: 2 }}>
                    <Avatar src={userData.image_url} alt="Foto de Perfil" sx={{ width: 100, height: 100, marginRight: 2, marginLeft: 3 }} />
                    <Box>
                        <Typography fontWeight="bold" fontSize="28px" color="White">{userData.username}</Typography>
                        {canEdit && (
                            <IconButton
                                sx={{ width: "45px", height: "45px", "&:hover": { backgroundColor: "rgba(21, 171, 215, 0.1)", "& .MuiSvgIcon-root": { color: "#15abd7" } } }}
                                onClick={handleEditClick}
                            >
                                <EditIcon sx={{ color: "#405e76", width: "100%", height: "100%" }} />
                            </IconButton>
                        )}
                    </Box>
                </Box>
                <Box sx={{ paddingTop: "12px", borderTop: "2px solid #2E6BE6", height: "135px", width: "600px", marginTop: "10px" }}>
                    <Box sx={{ backgroundColor: "#2E4274", height: "100%", borderRadius: "20px", padding: "10px", display: "flex" }}>
                        <Box>
                            <Typography fontSize="16px" color="white" fontWeight="bold">Correo Institucional</Typography>
                            <Typography fontSize="16px" color="white" fontWeight="bold" marginTop="10px">Carrera</Typography>
                        </Box>
                        <Box marginLeft="25px">
                            <Typography fontSize="16px" color="#E3E3E3">{userData.email}</Typography>
                            <Typography fontSize="16px" color="#E3E3E3" marginTop="10px">{career}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ModalProfileEdit open={isModalOpen} onClose={handleCloseModal} userData={userData} setUserData={setUserData} />
        </>
    );
};


export default HeaderProfile;
