/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'out',
    images: {
        unoptimized: true,
    },
    eslint: {
      // ignore eslint during build process
      ignoreDuringBuilds: true,
    },
  }

module.exports = nextConfig
