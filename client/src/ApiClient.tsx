import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Dynamically set the base URL
});

export default apiClient;
