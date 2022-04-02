/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    quoteKey: process.env.QUOTE_KEY,
  },
  nextConfig,
};
