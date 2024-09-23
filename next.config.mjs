// next.config.mjs

import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
        port: "",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add the plugin to the Webpack plugins array
    if (!isServer) {
      config.plugins.push(new CaseSensitivePathsPlugin());
    }
    return config;
  },
};

export default nextConfig;
