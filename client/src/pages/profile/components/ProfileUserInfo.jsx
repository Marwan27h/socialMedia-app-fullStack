import React from "react"
import AddReactionSharpIcon from "@mui/icons-material/AddReactionSharp"
import PlaceIcon from "@mui/icons-material/Place"
import ImageSearchIcon from "@mui/icons-material/ImageSearch"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CloseIcon from "@mui/icons-material/Close"
import EditNoteIcon from "@mui/icons-material/EditNote"
import EngineeringIcon from "@mui/icons-material/Engineering"
import WorkIcon from "@mui/icons-material/Work"
import Diversity1SharpIcon from "@mui/icons-material/Diversity1Sharp"
import SnowboardingIcon from "@mui/icons-material/Snowboarding"
import PublicIcon from "@mui/icons-material/Public"

const ProfileUserInfo = ({
    data,
    userId,
    currentUser,
    rIsLoading,
    relationshipData,
    handleFollow,
    setOpenUpdate,
    images,
    showSlideshow,
    setShowSlideshow,
    handleGalleryClick,
    handleCloseSlideshow,
    currentImageIndex,
    setCurrentImageIndex,
    followingCount,
    followingCountLoading,
    followedCount,
    followedCountLoading,
}) => {
    return (
        <div className="uInfo">
            <div className="left">
                <div className="item">
                    <Diversity1SharpIcon fontSize="large" />
                    <span>
                        {followingCount && followingCount.length > 0
                            ? `${followingCount.length} Following`
                            : "0 Following"}
                    </span>
                </div>
                <div className="item">
                    <AddReactionSharpIcon fontSize="large" />
                    <span>
                        {followedCount && followedCount.length > 0
                            ? `${followedCount.length} Followed`
                            : "0 Followed"}
                    </span>
                </div>
                <div className="item">
                    <SnowboardingIcon />
                    <span>{data.hobbies || "None"}</span>
                </div>
                <div className="item">
                    <PublicIcon fontSize="large" />
                    <span>{data.nationality || "None"}</span>
                </div>
            </div>
            <div className="center">
                <span>
                    {data.name || null} {""} {data.age || null}
                </span>
                {rIsLoading ? (
                    "Loading"
                ) : userId === currentUser.id ? (
                    <EditNoteIcon
                        onClick={() => setOpenUpdate(true)}
                        className="editIcon"
                        fontSize="large"
                    />
                ) : (
                    <button onClick={handleFollow}>
                        {relationshipData.includes(currentUser.id)
                            ? "Following"
                            : "Follow"}
                    </button>
                )}
            </div>
            <div className="right">
                <div className="item">
                    <EngineeringIcon fontSize="large" />{" "}
                    <span>{data.work || "None"}</span>
                </div>
                <div className="item">
                    <PlaceIcon fontSize="large" />
                    <span>{data.city || "None"}</span>
                </div>
                <div className="item">
                    <WorkIcon fontSize="large" />
                    <span>{data.school || "None"}</span>
                </div>
                <div className="item">
                    <ImageSearchIcon
                        fontSize="large"
                        onClick={handleGalleryClick}
                    />
                    {showSlideshow && (
                        <div className="slideshow">
                            <CloseIcon
                                className="closeIconProfile"
                                fontSize="large"
                                onClick={handleCloseSlideshow}
                            />

                            {images.length > 0 ? (
                                <>
                                    <img
                                        src={
                                            "/upload/" +
                                            images[currentImageIndex].img
                                        }
                                        alt="Slideshow"
                                        className="slideshow-image"
                                    />
                                    <div className="slideshow-controls">
                                        {currentImageIndex > 0 && (
                                            <button
                                                onClick={() =>
                                                    setCurrentImageIndex(
                                                        (prev) => prev - 1
                                                    )
                                                }
                                            >
                                                <KeyboardArrowLeftIcon fontSize="large" />
                                            </button>
                                        )}
                                        {currentImageIndex <
                                            images.length - 1 && (
                                            <button
                                                onClick={() =>
                                                    setCurrentImageIndex(
                                                        (prev) => prev + 1
                                                    )
                                                }
                                            >
                                                <ChevronRightIcon fontSize="large" />
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <p>No images</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileUserInfo
