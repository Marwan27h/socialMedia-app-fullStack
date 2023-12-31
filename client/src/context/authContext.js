import { createContext, React, useEffect, useState } from "react"
import { makeRequest } from "../axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [error, setError] = useState(null)

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("userData")) || null
    )

    const login = async (inputs) => {
        try {
            const res = await makeRequest.post("/auth/login", inputs, {
                withCredentials: true,
            })

            const { user, accessToken } = res.data

            localStorage.setItem(
                "userData",
                JSON.stringify({ ...user, accessToken })
            )

            setCurrentUser({ ...user, accessToken })

            setError(null)
        } catch (error) {
            setError(error.response.data)
        }
    }

    const logout = async () => {
        try {
            await makeRequest.post("/auth/logout", null, {
                withCredentials: true,
            })

            localStorage.removeItem("userData")
            setCurrentUser(null)
        } catch (error) {
            setError(error.response.data)
        }
    }

    const getAccessToken = () => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        return userData ? userData.accessToken : null
    }

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                logout,
                getAccessToken,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
