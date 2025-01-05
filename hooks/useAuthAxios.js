import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { axiosInstance } from "@/lib/api"

const useAuthAxios = () => {
  const supabase = createClientComponentClient()

  axiosInstance.interceptors.request.use(
    async (config) => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`
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
    let { data } = await axiosInstance.get(url)
    return data
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
