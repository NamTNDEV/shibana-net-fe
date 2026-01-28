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
  async rewrites() {
    return [
      {
        source: '/@:username',
        destination: '/profile/:username',
      },
    ];
  },
};

export default nextConfig;
