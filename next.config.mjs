/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000', '127.0.0.1', 'run-agent-6a1e5cd18068ed080dfd8c65-mpw9khz1.remote-agent.svc.cluster.local'],
  output: 'export',
  trailingSlash: true,
}

export default nextConfig
