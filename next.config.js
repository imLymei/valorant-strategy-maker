/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['media.valorant-api.com'],
	},
};

module.exports = nextConfig;
