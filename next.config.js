/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
// module.exports = {
//   experimental: {
//     images: {
//       unoptimized: true,
//     },
//   },
// };
