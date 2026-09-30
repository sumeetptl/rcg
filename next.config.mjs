/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [],
  experimental: {
    serverActions: {
      allowedOrigins: [
        'coinstaq.com',
        '*.coinstaq.com',
        'rcg-git-rebrand-sumeet-patils-projects.vercel.app',
        '*.vercel.app'
      ]
    }
  }
};

export default nextConfig;
