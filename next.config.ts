import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'http',
        hostname:'localhost',
        port:'8000',
      }
    ],
    dangerouslyAllowLocalIP: true,
  },

  allowedDevOrigins: ['10.165.113.141'],
  reactStrictMode:true,
};


export default nextConfig;
