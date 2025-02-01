/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BACKEND_URL: process.env.BACKEND_URL || "https://true-beacon-jkzr.vercel.app"
    }
  };
  
  export default nextConfig;
  