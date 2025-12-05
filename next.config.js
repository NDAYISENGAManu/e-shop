/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
  },
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
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'pg': 'commonjs pg',
        'pg-hstore': 'commonjs pg-hstore',
        'sequelize': 'commonjs sequelize',
      });
    }
    return config;
  },
}

module.exports = nextConfig
