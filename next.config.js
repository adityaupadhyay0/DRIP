/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // Disable PWA for now to resolve build issues in sandbox
  /*
  pwa: {
    dest: 'public',
    disable: true,
  }
  */
};

module.exports = nextConfig;
