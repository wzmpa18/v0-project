/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    '.trae.cn',
    '.agent-sandbox-bj-a1-gw.trae.cn',
  ],
}

export default nextConfig
