/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'web/build',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
