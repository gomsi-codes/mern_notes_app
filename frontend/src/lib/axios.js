import axios from "axios";

const api = axios.create({
    baseURL: 'https://mern-notes-app-backend-au3s.onrender.com/api'
})

export default api
