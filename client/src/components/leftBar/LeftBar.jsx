import "./leftBar.scss"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { Link, useNavigate } from "react-router-dom"
import { makeRequest } from "../../axios"
import Watch from "../../assets/4.png"
import Events from "../../assets/6.png"
import Gallery from "../../assets/8.png"
import Videos from "../../assets/9.png"
import Messages from "../../assets/10.png"
import Tutorials from "../../assets/11.png"
import Courses from "../../assets/12.png"
import Fund from "../../assets/13.png"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CloseIcon from "@mui/icons-material/Close"
import noPersonImage from "../../assets/noPersonImage.png"
import NotificationsDropdown from "./components/NotificationsDropdown"
import { useQuery } from "@tanstack/react-query"

const NavigationItem = ({ icon, label, path, onClick }) => (
    <div
        className="item navigation-item"
        onClick={() => onClick(path)}
        style={{ cursor: "pointer" }}
    >
        <img src={icon} alt="" />
        <span>{label}</span>
    </div>
)

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [followingData, setFollowingData] = useState([])
    const [isFollowingOpen, setIsFollowingOpen] = useState(false)
    const [followedData, setFollowedData] = useState(0)
    const [isFollowedOpen, setIsFollowedOpen] = useState(false)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [galleryImages, setGalleryImages] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handleNavigation = (path) => {
        navigate(path)
    }

    const fetchData = async (endpoint) => {
        try {
            const response = await makeRequest.get(endpoint)
            return response.data
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const openModal = async (endpoint) => {
        const data = await fetchData(endpoint)
        if (data) {
            if (endpoint.includes("followed-count")) {
                setFollowedData(data)
                setIsFollowedOpen(true)
            } else if (endpoint.includes("friends")) {
                setFollowingData(data)
                setIsFollowingOpen(true)
            } else if (endpoint.includes("images")) {
                const dataArray =
                    typeof data === "string" ? JSON.parse(data) : data
                if (dataArray && dataArray.length > 0) {
                    setGalleryImages(dataArray)
                    setIsGalleryOpen(true)
                    setCurrentImageIndex(0)
                } else {
                    console.log("No images found for this user.")
                }
            } else {
                console.log("Invalid response format.")
            }
        }
    }

    const closeModal = () => {
        setIsGalleryOpen(false)
        setIsFollowingOpen(false)
        setIsFollowedOpen(false)
    }

    const { data: notifications } = useQuery(
        ["notifications", currentUser.id],
        async () => {
            try {
                const response = await makeRequest.get(
                    `/notifications?userId=${currentUser.id}`
                )
                return response.data
            } catch (error) {
                throw new Error("Failed to fetch notifications")
            }
        },
        {
            refetchInterval: 60000,
        }
    )

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <NotificationsDropdown notifications={notifications} />
                </div>

                <div className="menu">
                    <span className="shortcuts">Your shortcuts</span>
                    <NavigationItem
                        icon={Fund}
                        label="Friends"
                        onClick={() => openModal("/friends")}
                    />
                    <NavigationItem
                        icon={Watch}
                        label="Followers"
                        onClick={() =>
                            openModal(
                                `/friends/followed-count/${currentUser.id}`
                            )
                        }
                    />
                    <NavigationItem
                        icon={Gallery}
                        label="Gallery"
                        onClick={() =>
                            openModal(`/posts/images/${currentUser.id}`)
                        }
                    />
                    <NavigationItem
                        icon={Videos}
                        label="Videos"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Messages}
                        label="Messages"
                        onClick={handleNavigation}
                    />
                </div>
                <hr />

                <div className="menu">
                    <span>Others</span>
                    <NavigationItem
                        icon={Events}
                        label="Events"
                        path="/event"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Tutorials}
                        label="About"
                        path="/about"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Courses}
                        label="Contact Us"
                        path="/contact"
                        onClick={handleNavigation}
                    />
                </div>
            </div>

            {isGalleryOpen && (
                <div className="fullscreen-modal-container">
                    <CloseIcon
                        className="closeIcon"
                        fontSize="large"
                        onClick={() => closeModal("gallery")}
                    />
                    {galleryImages.length > 0 ? (
                        <>
                            <img
                                src={
                                    "/upload/" +
                                    galleryImages[currentImageIndex].img
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
                                    galleryImages.length - 1 && (
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
            {isFollowingOpen && (
                <div className="fullscreen-friends-modal">
                    <CloseIcon
                        className="closeIcon"
                        fontSize="large"
                        onClick={() => closeModal("friends")}
                    />
                    {followingData.length > 0 &&
                        followingData.map((friend, index) => (
                            <div className="user" key={index}>
                                <div className="userInfo">
                                    <img
                                        className="img"
                                        src={
                                            friend.profilePic
                                                ? "/upload/" + friend.profilePic
                                                : noPersonImage
                                        }
                                        alt={friend.name}
                                    />
                                    <div className="online" />
                                    <Link
                                        to={`/profile/${friend.userId}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <span>{friend.name}</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            )}
            {isFollowedOpen && (
                <div className="fullscreen-friends-modal">
                    <CloseIcon
                        className="closeIcon"
                        fontSize="large"
                        onClick={() => closeModal("friends")}
                    />
                    {followedData.length > 0 &&
                        followedData.map((friend, index) => (
                            <div className="user" key={index}>
                                <div className="userInfo">
                                    <img
                                        className="img"
                                        src={
                                            friend.profilePic
                                                ? "/upload/" + friend.profilePic
                                                : noPersonImage
                                        }
                                        alt={friend.name}
                                    />
                                    <div className="online" />
                                    <Link
                                        to={`/profile/${friend.userId}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <span>{friend.name}</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}

export default LeftBar
