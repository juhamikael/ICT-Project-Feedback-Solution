/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from these domains
  images: {
    domains: ["localhost", "res.cloudinary.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
