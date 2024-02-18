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
    ],
  },
}

export default nextConfig
