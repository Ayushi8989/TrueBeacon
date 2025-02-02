/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      API_BASE_URL: process.env.API_BASE_URL,
      WEB_SOCKET_URL: process.env.WEB_SOCKET_URL
    }
  };
  
  export default nextConfig;
  