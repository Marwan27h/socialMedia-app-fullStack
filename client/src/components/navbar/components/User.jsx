import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined" 
import LogoutIcon from "@mui/icons-material/ExitToApp" 
import noPersonImage from "../../../assets/noPersonImage.png"
import DeleteConfirmationBox from "./DeleteConfirmationBox"

const UserSection = ({
    currentUser,
    handleLogout,
    getFirstName,
    handleDeleteUser,
}) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
        const navigate = useNavigate()

    return (
        <div className="right">
            <DeleteOutlineIcon
                style={{ cursor: "pointer" }}
                onClick={() => setShowDeleteConfirmation(true)}
            />

            {showDeleteConfirmation && (
                <DeleteConfirmationBox
                    onCancel={() => setShowDeleteConfirmation(false)}
                    onDelete={() => {
                        handleDeleteUser()
                        navigate("/login", { replace: true })
                    }}
                />
            )}

            <PersonOutlinedIcon />

            {currentUser && (
                <LogoutIcon
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                />
            )}
            <div className="user">
                <img
                    src={
                        currentUser.profilePic
                            ? `/upload/${currentUser.profilePic}`
                            : noPersonImage
                    }
                    alt=""
                />
                <Link
                    to={`/profile/${currentUser.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <span>{getFirstName(currentUser.name)}</span>
                </Link>
            </div>
        </div>
    )
}

export default UserSection
