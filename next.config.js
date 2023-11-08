/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.myanimelist.net"
      },
      {
        hostname: "img.youtube.com"
      }
    ],
  },
}

module.exports = nextConfig
