/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.regcheck.org.uk',
          },
        ],
      },
};

export default nextConfig;
