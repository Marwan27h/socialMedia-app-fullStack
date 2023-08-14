import axios from "axios"

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api` 

export const makeRequest = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
})
