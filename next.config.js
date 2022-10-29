/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/sample',
        destination: '/',
        permanent: true,
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};
