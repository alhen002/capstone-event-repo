/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "unsplash.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
