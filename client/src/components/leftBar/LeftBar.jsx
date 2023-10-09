import "./leftBar.scss"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import { makeRequest } from "../../axios"
import Friends from "../../assets/1.png"
import Groups from "../../assets/2.png"
import Market from "../../assets/3.png"
import Watch from "../../assets/4.png"
import Memories from "../../assets/5.png"
import Events from "../../assets/6.png"
import Gaming from "../../assets/7.png"
import Gallery from "../../assets/8.png"
import Videos from "../../assets/9.png"
import Messages from "../../assets/10.png"
import Tutorials from "../../assets/11.png"
import Courses from "../../assets/12.png"
import Fund from "../../assets/13.png"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CloseIcon from "@mui/icons-material/Close"

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
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [galleryImages, setGalleryImages] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handleNavigation = (path) => {
        navigate(path)
    }

    const handleGalleryClick = async () => {
        try {
            console.log("handleGalleryClick is called")

            const response = await makeRequest.get(
                `/posts/images/${currentUser.id}`
            )
            console.log("Response data:", response.data)

            if (typeof response.data === "string") {
                // If the response is a string, parse it as JSON
                const data = JSON.parse(response.data)

                if (data && data.length > 0) {
                    setGalleryImages(data)
                    setIsGalleryOpen(true)
                    setCurrentImageIndex(0)
                } else {
                    console.log("No images found for this user.")
                }
            } else if (Array.isArray(response.data)) {
                // If the response is already an array, no need to parse
                if (response.data.length > 0) {
                    setGalleryImages(response.data)
                    setIsGalleryOpen(true)
                    setCurrentImageIndex(0)
                } else {
                    console.log("No images found for this user.")
                }
            } else {
                console.log("Invalid response format.")
            }
        } catch (error) {
            console.error("Error fetching gallery images:", error)
        }
    }

    const handleCloseGallery = () => {
        setIsGalleryOpen(false)
    }

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <NavigationItem
                        icon={Friends}
                        label="Friends"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Groups}
                        label="Groups"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Market}
                        label="Marketplace"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Watch}
                        label="Watch"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Memories}
                        label="Memories"
                        onClick={handleNavigation}
                    />
                </div>
                <hr />
                <div className="menu">
                    <span>Your shortcuts</span>
                    <NavigationItem
                        icon={Fund}
                        label="Events"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Gaming}
                        label="Gaming"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Gallery}
                        label="Gallery"
                        onClick={handleGalleryClick}
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
                <div className="fullscreen-image-container">
                    <CloseIcon
                        className="closeIcon"
                        fontSize="large"
                        onClick={handleCloseGallery}
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
        </div>
    )
}

export default LeftBar
