import axios from "axios";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const instance = axios.create({
    baseURL: "https://api.example.com",
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

export default instance;
