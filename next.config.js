/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FBI_API_KEY: process.env.FBI_API_KEY || 'DEMO_KEY',
    FBI_API_BASE_URL: 'https://api.usa.gov/crime/fbi/sapi/api'
  }
}

module.exports = nextConfig

