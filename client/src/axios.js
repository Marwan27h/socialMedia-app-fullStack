import axios from "axios"

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api`

const getAccessToken = () => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    const token = userData ? userData.accessToken : null
    console.log("Access Token:", token) // Add this line to log the token
    return token
}

export const makeRequest = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getAccessToken()}`,
    },
})
