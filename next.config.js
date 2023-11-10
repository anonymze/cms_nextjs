/** @type {import('next').NextConfig} */
const nextConfig = {
  // i think it is necessary to transpile lucide-react if you want to do a dynamic import of this package
  // transpilePackages: ['lucide-react'],
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
