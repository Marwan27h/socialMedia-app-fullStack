import React, { useState, useEffect } from "react"
import NoImage from "../../../assets/NoImage.png"
import noPersonImage from "../../../assets/noPersonImage.png"

const ProfileImages = ({ data }) => {
    const [isCoverLoaded, setIsCoverLoaded] = useState(false)
    const [isProfilePicLoaded, setIsProfilePicLoaded] = useState(false)

    useEffect(() => {
        if (data) {
            if (data.coverPic) {
                const coverImage = new Image()
                coverImage.src = "/upload/" + data.coverPic
                coverImage.onload = () => {
                    setIsCoverLoaded(true)
                }
            } else {
                setIsCoverLoaded(true) // No cover image, mark it as loaded
            }

            if (data.profilePic) {
                const profilePicImage = new Image()
                profilePicImage.src = "/upload/" + data.profilePic
                profilePicImage.onload = () => {
                    setIsProfilePicLoaded(true)
                }
            } else {
                setIsProfilePicLoaded(true) // No profile picture, mark it as loaded
            }
        }
    }, [data])

    return (
        <div className="images">
            {isCoverLoaded ? (
                <img
                    src={
                        data && data.coverPic
                            ? "/upload/" + data.coverPic
                            : NoImage
                    }
                    alt=""
                    className="cover"
                />
            ) : (
                <div className="cover placeholder"></div>
            )}
            {isProfilePicLoaded ? (
                <img
                    src={
                        data && data.profilePic
                            ? "/upload/" + data.profilePic
                            : noPersonImage
                    }
                    alt=""
                    className="profilePic"
                />
            ) : (
                <div className="profilePic placeholder"></div>
            )}
        </div>
    )
}

export default ProfileImages
