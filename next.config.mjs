/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'cooperpress.s3.amazonaws.com',
      'pbs.twimg.com',
      'typescript-weekly.com',
      'www.smashingmagazine.com'
    ],
  },
};

export default nextConfig; 