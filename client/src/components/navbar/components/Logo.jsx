import React from 'react';
import { Link } from "react-router-dom"
import NotificationsIcon from "@mui/icons-material/Notifications"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"


const LogoNav = ({
    darkMode,
    toggle,
    handleSearch,
    handleNotificationsClick,

}) => (
    <>
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
            <span className="logo-span">InterActify</span>
        </Link>

        <NotificationsIcon
            style={{ cursor: "pointer" }}
            
        />

     

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <HomeOutlinedIcon />
        </Link>

        {darkMode ? (
            <WbSunnyOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={toggle}
            />
        ) : (
            <DarkModeOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={toggle}
            />
        )}

        {/* Rest of the search component... */}
    </>
)

export default LogoNav
