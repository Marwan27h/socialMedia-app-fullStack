import React, { useState, useEffect } from "react"
import NoImage from "../../../assets/NoImage.png"
import noPersonImage from "../../../assets/noPersonImage.png"

const ProfileImages = ({ data }) => {
    const [isCoverLoaded, setIsCoverLoaded] = useState(false)
    const [isProfilePicLoaded, setIsProfilePicLoaded] = useState(false)

    useEffect(() => {
        const coverImage = new Image()
        coverImage.src = data.coverPic ? "/upload/" + data.coverPic : NoImage
        coverImage.onload = () => {
            setIsCoverLoaded(true)
        }

        const profilePicImage = new Image()
        profilePicImage.src = data.profilePic
            ? "/upload/" + data.profilePic
            : noPersonImage
        profilePicImage.onload = () => {
            setIsProfilePicLoaded(true)
        }
    }, [data.coverPic, data.profilePic])

    return (
        <div className="images">
            {isCoverLoaded ? (
                <img
                    src={data.coverPic ? "/upload/" + data.coverPic : NoImage}
                    alt=""
                    className="cover"
                />
            ) : (
                <div className="cover placeholder"></div>
            )}
            {isProfilePicLoaded ? (
                <img
                    src={
                        data.profilePic
                            ? "/upload/" + data.profilePic
                            : noPersonImage
                    }
                    alt=""
                    className="profilePic"
                />
            ) : (
                <div className="profilePic placeholder">
                   
                </div>
            )}
        </div>
    )
}

export default ProfileImages
