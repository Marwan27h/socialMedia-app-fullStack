import "./leftBar.scss"
import { useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path)
    }

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <NavigationItem
                        icon={Friends}
                        label="Friends"
                        path="/friends"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Groups}
                        label="Groups"
                        path="/groups"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Market}
                        label="Marketplace"
                        path="/marketplace"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Watch}
                        label="Watch"
                        path="/watch"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Memories}
                        label="Memories"
                        path="/memories"
                        onClick={handleNavigation}
                    />
                </div>
                <hr />
                <div className="menu">
                    <span>Your shortcuts</span>
                    <NavigationItem
                        icon={Fund}
                        label="Events"
                        path="/about" // Corrected path here
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Gaming}
                        label="Gaming"
                        path="/gaming"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Gallery}
                        label="Gallery"
                        path="/gallery"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Videos}
                        label="Videos"
                        path="/videos"
                        onClick={handleNavigation}
                    />
                    <NavigationItem
                        icon={Messages}
                        label="Messages"
                        path="/messages"
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
        </div>
    )
}

export default LeftBar
