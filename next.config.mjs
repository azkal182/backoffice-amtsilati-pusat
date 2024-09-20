/** @type {import('next').NextConfig} */
const nextConfig = {
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
