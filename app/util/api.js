import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://vouched.vercel.app' : 'http://localhost:3000';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

//https://github.com/jpmorganchase/onyx-ssi-sdk

// export const postGenerateDid = async (handle, type) => {
//     const res = await axiosInstance.post(`/api/provision/did`, {handle, type})
//     return res.data
// }