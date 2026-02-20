import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    }
  },
  async redirects() {
    return [
      {
        source: '/profile/:handle(@.*)',
        destination: '/:handle',
        permanent: false,
      },
      {
        source: '/profile/:handle((?!@).*)',
        destination: '/@:handle',
        permanent: false,
      }
    ];
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8888',
        pathname: '/api/v1/media/static/**',
      },
      // {
      //   protocol: 'http',
      //   hostname: '127.0.0.1',
      //   port: '8888',
      //   pathname: '/api/v1/media/static/**',
      // },
      // {
      //   protocol: 'http',
      //   hostname: '::1',
      //   port: '8888',
      //   pathname: '/api/v1/media/static/**',
      // }
    ],
  },
};

export default nextConfig;
