/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['sequelize', 'sequelize-typescript'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  turbopack: {},
}

module.exports = nextConfig
