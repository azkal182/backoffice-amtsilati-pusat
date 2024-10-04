/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    console.log("AUTH_TRUST_HOST URL:", process.env.AUTH_TRUST_HOST);
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.edgestore.dev",
        port: ""
      }
    ]
  }
};

export default nextConfig;
