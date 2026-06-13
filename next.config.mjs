import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    '.trae.cn',
    '.agent-sandbox-bj-a1-gw.trae.cn',
  ],
}

export default nextConfig