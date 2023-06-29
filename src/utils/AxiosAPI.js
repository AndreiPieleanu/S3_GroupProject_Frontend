import axios from 'axios';

const AxiosAPI = axios.create({
    baseURL: 'http://localhost:8080/',
});

export default AxiosAPI;