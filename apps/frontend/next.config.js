/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		STATIC_API_KEY: process.env.STATIC_API_KEY,
	},
}

module.exports = nextConfig
