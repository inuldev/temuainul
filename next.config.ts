import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "prime-instantly-cod.ngrok-free.app",
    "*.ngrok-free.app", // Allow any ngrok-free.app subdomain
    "*.ngrok.io", // Allow classic ngrok domains
  ],
};

export default nextConfig;
