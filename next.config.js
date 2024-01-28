/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    eslint: {
      // ignore eslint during build process
      ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: 'edge',
    serverRuntimeConfig: 'edge',
    experimental: {
      runtime: 'edge',
    }
  }

module.exports = nextConfig
