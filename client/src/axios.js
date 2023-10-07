import axios from "axios"

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api`

const getAccessToken = () => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    return userData ? userData.accessToken : null
}

export const makeRequest = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getAccessToken()}`,
    },
})
