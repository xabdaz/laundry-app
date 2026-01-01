// @ts-check
import withPWA from '@ducanh2912/next-pwa';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', 'http://app.rumah-laundry.id'],
}

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig);
