/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FBI_API_KEY: process.env.FBI_API_KEY || 'DEMO_KEY',
    FBI_API_BASE_URL: 'https://api.usa.gov/crime/fbi/sapi/api'
  },
  webpack: (config, { isServer }) => {
    // Mark database packages as optional externals to prevent build errors
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'mongodb': 'commonjs mongodb',
        'sqlite3': 'commonjs sqlite3',
        'better-sqlite3': 'commonjs better-sqlite3',
        'pg': 'commonjs pg'
      });
    }
    return config;
  }
}

module.exports = nextConfig

