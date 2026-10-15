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
  },
  async headers() {
    return [
      {
        source: "/(day-logo|night-logo|full-logo).(png|svg|jpeg|jpg)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ]
  },
};

export default nextConfig;
