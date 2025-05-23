import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['fakestoreapi.com','res.cloudinary.com'], // Add fakestoreapi.com here
  },
  reactStrictMode: false,

};

export default nextConfig;
