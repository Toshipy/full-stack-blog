import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    }
  }
}

export default nextConfig
