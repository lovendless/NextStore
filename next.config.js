/** @type {import('next').NextConfig} */
const nextConfig = {
   //logging:{
   //   fetches: {
   //      fullUrl: true,
   //   },
   //},
   images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
}

module.exports = nextConfig
