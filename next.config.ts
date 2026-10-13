import type { NextConfig } from "next";

const imageApiUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL2 || "http://localhost:8000");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{
      protocol: imageApiUrl.protocol.slice(0, -1) as "http" | "https",
      hostname: imageApiUrl.hostname,
      ...(imageApiUrl.port ? { port: imageApiUrl.port } : {}),
      pathname: "/**",
    }],
  },

  allowedDevOrigins: ['10.165.113.141'],
  reactStrictMode:true,
};


export default nextConfig;
