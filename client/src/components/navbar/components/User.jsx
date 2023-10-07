import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import LogoutIcon from "@mui/icons-material/ExitToApp"
import noPersonImage from "../../../assets/noPersonImage.png"
import DeleteConfirmationBox from "./DeleteConfirmationBox"
import { makeRequest } from "../../../axios"
import { useQuery } from "@tanstack/react-query"

const UserSection = ({
    currentUser,
    logout,
    getFirstName,
    handleDeleteUser,
}) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const navigate = useNavigate()

    const { data: updatedCurrentUser, isLoading } = useQuery(
        ["user", currentUser.id],
        async () => {
            const response = await makeRequest.get(
                `/users/find/${currentUser.id}`
            )
            return response.data
        },
        {
            cacheTime: 60000,
            refetchInterval: 30000,
        }
    )

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
                <LogoutIcon style={{ cursor: "pointer" }} onClick={logout} />
            )}

            <div className="user">
                {isLoading ? (
                    <div>Loading...</div> // Render a loading placeholder
                ) : (
                    <>
                        <img
                            src={
                                updatedCurrentUser?.profilePic
                                    ? `/upload/${
                                          updatedCurrentUser.profilePic
                                      }?${Date.now()}`
                                    : noPersonImage
                            }
                            alt=""
                        />
                        <Link
                            to={`/profile/${updatedCurrentUser.id}`}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <span>
                                {getFirstName(updatedCurrentUser?.name)}
                            </span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserSection
