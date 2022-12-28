/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      //config.resolve.fallback.fs = false;
      //config.resolve.fallback.readline = false;
    }
    return config;
  },
}
//module.exports = nextConfig
