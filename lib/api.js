import axios from "axios"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://vouched.fly.dev"
    : "http://localhost:8001"

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})
