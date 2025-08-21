import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r810983k-1337.euw.devtunnels.ms",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
