/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:["static.vecteezy.com","www.shutterstock.com","griceviz.com"]
  }
}

module.exports = nextConfig
