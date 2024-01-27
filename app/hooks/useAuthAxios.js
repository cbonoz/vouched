
// Create axios hook with session
import { useAuth, } from '@clerk/nextjs';
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://usevouched.com' : 'http://localhost:3001';

const useAuthAxios = () => {
    const { getToken } = useAuth();
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    const getProfile = async (handle, type) => {
        const res = await axiosInstance.get(`/public/profile/${handle}?type=${type}`)
        return res.data
    }

    const getUser = async (email) => {
        const res = await axiosInstance.get(`/users?email=${email}`)
        return res.data
    }

    const postEndorse = async (body) => {
        const res = await axiosInstance.post(`/users/endorse`, body)
        return res.data
    }


    return {
        getProfile,
        getUser,
        postEndorse
    };
}
export default useAuthAxios;

