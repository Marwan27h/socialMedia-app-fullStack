import "./navbar.scss"
import { useNavigate } from "react-router-dom"
import { React, useContext, useState, useRef, useCallback, useEffect } from "react"
import { DarkModeContext } from "../../context/darkModeContext"
import { AuthContext } from "../../context/authContext"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import Logo from "./components/Logo"
import Search from "./components/Search"
import User from "./components/User"

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext)
    const { currentUser, logout } = useContext(AuthContext)
    const [searchQuery, setSearchQuery] = useState("")
    const searchContainerRef = useRef(null)
    const userFoundRef = useRef(null)
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState([])
    const [showNotificationsDropdown, setShowNotificationsDropdown] =
        useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    useState(false)

    const { isLoading, error, data, setData } = useQuery(
        ["users", searchQuery],
        async () => {
            try {
                const response = await makeRequest.get(
                    `/users/search?name=${searchQuery}`
                )

                return response.data
            } catch (error) {
                throw new Error("Failed to fetch users")
            }
        }
    )
    const handleSearch = useCallback(() => {
        if (searchQuery.trim() !== "") {
            setSearchQuery("")
        }
    }, [searchQuery])

    const handleBlur = useCallback(() => {
        setTimeout(() => {
            if (!userFoundRef.current.contains(document.activeElement)) {
                setSearchQuery("")
                setData(null)
            }
        }, 0)
    }, [userFoundRef, setData])

    const getFirstName = (fullName) => {
        if (fullName) {
            const parts = fullName.split(" ")
            return parts[0]
        }
    }

    const { data: notificationsData, refetch: refetchNotifications } = useQuery(
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

    useEffect(() => {
        if (notificationsData) {
            setNotifications(notificationsData)
        }
    }, [notificationsData])

    const handleNotificationsClick = async () => {
        try {
            await refetchNotifications()
            setShowNotificationsDropdown((prevState) => !prevState)
        } catch (error) {
            console.error("Failed to fetch notifications:", error)
        }
    }

    const handleDeleteUser = async () => {
        try {
            const response = await makeRequest.delete(
                `/users?id=${currentUser.id}`
            )
            console.log("hi")

            if (response.status === 200) {
                console.log(
                    "Account deleted successfully. Navigating to login..."
                )
                localStorage.removeItem("userData")
                navigate("/login")
            } 
        } catch (error) {
            throw error
        }
    }

    return (
        <div className="navbar">
            <div className="left">
                <Logo
                    darkMode={darkMode}
                    toggle={toggle}
                    handleNotificationsClick={handleNotificationsClick}
                    notifications={notifications}
                    showNotificationsDropdown={showNotificationsDropdown}
                />

                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    handleBlur={handleBlur}
                    isLoading={isLoading}
                    error={error}
                    data={data}
                    searchContainerRef={searchContainerRef}
                    inputRef={inputRef}
                    userFoundRef={userFoundRef}
                />
            </div>

            <User
                currentUser={currentUser}
                logout={logout}
                getFirstName={getFirstName}
                setShowDeleteConfirmation={setShowDeleteConfirmation}
                showDeleteConfirmation={showDeleteConfirmation}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    )
}

export default Navbar
