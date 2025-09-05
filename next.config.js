/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  images: {
    domains: ['public.blob.vercel-storage.com'],
  },
}

module.exports = nextConfig