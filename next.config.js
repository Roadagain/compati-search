module.exports = {
  async redirects() {
    return [
      {
        source: '/sample',
        destination: '/',
        permanent: true,
      }
    ]
  }
}
