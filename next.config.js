/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
  trailingSlash: true
};

module.exports = nextConfig;
