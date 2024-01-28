/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    eslint: {
      // ignore eslint during build process
      ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
      runtime: 'edge',
    },
    serverRuntimeConfig: {
      runtime: 'edge'
    }
  }

module.exports = nextConfig
