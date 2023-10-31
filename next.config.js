/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        hostname: "cdn.myanimelist.net"
      }
    ]
  }
}

module.exports = nextConfig
