import axios from "axios"

export const makeRequest = axios.create({
   baseURL: "http://localhost:3006/api/",
   withCredentials:true, 
})