/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  compiler: {
    emotion: true,
  },

  // framer-motion 설정
  webpack: config => {
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false, // disable the behaviour
      },
    })
    return config
  },
}

module.exports = nextConfig
