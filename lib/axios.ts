import axios from "axios";

const BASE_URL= "http://44.243.8.35:3000";


export default axios.create({
    baseURL: BASE_URL,
    headers:{"Content-Type":"application/json"},
})

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers:{"Content-Type":"application/json"},
})

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

