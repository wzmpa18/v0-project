/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['http://localhost:3000', 'run-agent-6a1e5cd18068ed080dfd8c65-mpw9khz1.remote-agent.svc.cluster.local'],
}

export default nextConfig
