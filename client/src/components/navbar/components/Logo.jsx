import React from 'react';
import { Link } from "react-router-dom"
import NotificationsIcon from "@mui/icons-material/Notifications"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import NotificationsDropdown from "./NotificationsDropdown"

const LogoNav = ({
    darkMode,
    toggle,
    handleSearch,
    handleNotificationsClick,
    showNotificationsDropdown,
    notifications,
}) => (
    <>
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
            <span className="logo-span">InterActify</span>
        </Link>

        <NotificationsIcon
            style={{ cursor: "pointer" }}
            onClick={handleNotificationsClick}
        />

        <div className="notifications-container">
            {showNotificationsDropdown && (
                <NotificationsDropdown notifications={notifications} />
            )}
        </div>

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
