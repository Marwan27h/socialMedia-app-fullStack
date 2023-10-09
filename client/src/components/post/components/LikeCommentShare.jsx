import React, { useState } from "react"
import ShareIcon from "@mui/icons-material/Share"
import {
    FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
    FavoriteOutlined as FavoriteOutlinedIcon,
    TextsmsOutlined as TextsmsOutlinedIcon,
} from "@mui/icons-material"
import { AddLocationAltOutlined as AddLocationAltIcon } from "@mui/icons-material"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import ShareConfirmationBox from "./ShareConfirmationBox"

const LikeCommentShare = ({
    isLoading,
    likesData,
    currentUser,
    handleLike,
    onShare,
    commentsData,
    commentOpen,
    setCommentOpen,
    post,
}) => {
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleShareClick = () => {
        setShowConfirmation(true)
    }

    const handleCancelShare = () => {
        setShowConfirmation(false)
    }

    const handleShareConfirmed = () => {
        setShowConfirmation(false)
        onShare(post.id)
    }
    return (
        <div className="info">
            <div className="item">
                {isLoading ? (
                    "loading"
                ) : likesData && likesData.includes(currentUser.id) ? (
                    <FavoriteOutlinedIcon
                        className="itemIcon"
                        style={{ color: "red" }}
                        onClick={handleLike}
                    />
                ) : (
                    <FavoriteBorderOutlinedIcon
                        className="itemIcon"
                        onClick={handleLike}
                    />
                )}
                <span>{likesData && likesData.length} Likes</span>
            </div>
            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                <TextsmsOutlinedIcon className="itemIcon" />
                <span>
                    {commentsData ? commentsData.length : "Loading"}{" "}
                    {commentsData && commentsData.length === 1
                        ? "Comment"
                        : "Comments"}
                </span>
            </div>
            <div className="item" onClick={handleShareClick}>
                <ShareIcon className="itemIcon" />
                <span>Share</span>
            </div>
            {post.place && (
                <div className="placeItem">
                    <AddLocationAltIcon className="placeIcon" />
                    <span> {post.place}</span>
                </div>
            )}
            {post.tag && (
                <div className="tagItem">
                    <LocalOfferIcon className="tagIcon" />
                    <span> {post.tag}</span>
                </div>
            )}
            {showConfirmation && (
                <ShareConfirmationBox
                    post={post}
                    onCancel={handleCancelShare}
                    onShare={handleShareConfirmed}
                />
            )}
        </div>
    )
}

export default LikeCommentShare
