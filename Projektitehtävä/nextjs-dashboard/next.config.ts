import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   // experimental: {
  //  ppr: 'incremental'
  //} 
};

// app/lib/data.ts
export const runtime = 'nodejs'; // Lisää tämä tarvittaessa

import postgres from 'postgres';
// postgres-yhteys...

export default nextConfig;

// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
