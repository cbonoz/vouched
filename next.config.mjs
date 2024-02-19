/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // enable image host i.pravatar.cc
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
      },
    ],
  },
}

export default nextConfig
