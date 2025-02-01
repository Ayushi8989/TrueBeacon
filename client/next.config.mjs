/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BACKEND_URL: process.env.BACKEND_URL || "https://my-server.vercel.app"
    }
  };
  
  export default nextConfig;
  