import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'static.wikia.nocookie.net',
      'encrypted-tbn1.gstatic.com',
      'images.wallpaperscraft.com',
      'encrypted-tbn0.gstatic.com',
      'png.pngtree.com',
      'www.wallart.com',
      'encrypted-tbn0.gstatic.com',
      'img.freepik.com',
      'mindtheg.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
