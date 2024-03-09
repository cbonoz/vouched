// Create axios hook with session
import { useAuth } from "@clerk/nextjs"

import { axiosInstance } from "@/lib/api"

const useAuthAxios = () => {
  const { getToken } = useAuth()

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const getProfile = async (handle, requesterEmail) => {
    const baseUrl = "/public/profile"
    // add query params if set use querystring
    const url = requesterEmail
      ? `${baseUrl}?handle=${handle}&requesterEmail=${requesterEmail}`
      : `${baseUrl}?handle=${handle}`
    const res = await axiosInstance.get(url)
    return res.data
  }

  const requestAccess = async (handle, message, email) => {
    const res = await axiosInstance.post(`/public/profile/access`, {
      handle,
      message,
      email,
    })
    return res.data
  }

  const getUser = async (email) => {
    const res = await axiosInstance.get(`/users?email=${email}`)
    return res.data
  }

  const postVouch = async (body) => {
    const res = await axiosInstance.post(`/users/vouch`, body)
    return res.data
  }

  return {
    getProfile,
    getUser,
    requestAccess,
    postVouch,
    authAxios: axiosInstance,
  }
}
export default useAuthAxios
