import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const abbreviate = (s: string) => (s ? `${s.substr(0, 6)}**` : "")

export const formatDate = (d: Date | string, onlyDate: boolean) => {
  if (!(d instanceof Date)) {
    d = d ? new Date(d) : new Date()
  }

  if (onlyDate) {
    return d.toLocaleDateString()
  }
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

export const isValidEmail = (email: string) => {
  return email && email.indexOf("@") !== -1
}

export const getNameFromUser = (user: any) => {
  return `${user.firstName} ${user.lastName}`
}

export const profileUrl = (profileHandle: string) =>
  `${window.location.origin}/profile/${profileHandle}`

export const termsUrl = () => `${window.location.origin}/terms`

export const convertCamelToHuman = (str: string) => {
  // Check if likely datetime timestamp ms
  if (str.length === 13) {
    return new Date(str).toLocaleDateString()
  }

  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (s) {
      return s.toUpperCase()
    })
    .replace(/_/g, " ")
}

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const createJsonFile = (signload: any, fileName: string) => {
  const st = JSON.stringify(signload)
  const blob = new Blob([st], { type: "application/json" })
  const fileData = new File([blob], fileName)
  return fileData
}

export const col = (k: string, render: any) => ({
  title: capitalize(k).replaceAll("_", " "),
  dataIndex: k,
  key: k,
  render,
})

export const isEmpty = (r: string | Array<any>) => {
  return !r || r.length === 0
}

export const humanError = (err: any) => {
  const { response } = err
  let message =
    response.data.error ||
    response.data.message ||
    err.message ||
    JSON.stringify(err)

  const statusCode = response?.status
  if (statusCode === 401) {
    message = "Unauthorized. Please login again."
  } else if (statusCode === 403) {
    message = "Forbidden. Please login again."
  } else if (statusCode === 429) {
    message = "Too many requests. Please try again later."
  } else if (statusCode === 409) {
    message = "Conflict. Please try again later."
  } else if (message.indexOf("404") !== -1) {
    message =
      "Could not find the requested item. This entry may not exist or may have moved"
  } else if (message.indexOf("Network Error") !== -1) {
    message = "Could not connect to server. Please try again later."
  }
  return message
}
