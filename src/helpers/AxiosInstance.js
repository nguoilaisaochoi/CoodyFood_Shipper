import axios from 'axios';

//egOs06SnjVLToRgU

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.1.104:9999/'//'http://192.168.1.150:9999/'
    });
    // cmd -----> ipconfig -----> IPv4 Address (192.168.1.1)
    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = '';
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;