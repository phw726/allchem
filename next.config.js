/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // middleware: {
  //   '@/pages/api/*': {
  //     handler: '@/pages/middleware.ts',
  //   },
  // },
  trailingSlash: false,
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

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   trailingSlash: false,
//   compiler: {
//     emotion: true,
//   },

//   // Framer-motion 설정
//   webpack: config => {
//     config.module.rules.push({
//       test: /\.m?js$/,
//       resolve: {
//         fullySpecified: false, // disable the behaviour
//       },
//     })
//     return config
//   },

//   // Rewrite 설정
//   async rewrites() {
//     return [
//       {
//         // /api/iuclid6로 시작하는 요청을 8080 포트의 IUCLID 서버로 전달
//         source: '/api/iuclid6/:path*',
//         destination: 'http://localhost:8080/iuclid6-ext/:path*',
//       },
//     ]
//   },
// }

// module.exports = nextConfig
