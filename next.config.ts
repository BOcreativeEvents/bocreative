import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/joinus',     destination: '/careers', permanent: true },
      { source: '/join-us',    destination: '/careers', permanent: true },
      { source: '/joinUs',     destination: '/careers', permanent: true },
      { source: '/contact',    destination: '/connect', permanent: true },
      { source: '/contact-us', destination: '/connect', permanent: true },
      { source: '/contactus',  destination: '/connect', permanent: true },
      { source: '/about',      destination: '/bo',      permanent: true },
      { source: '/about-us',   destination: '/bo',      permanent: true },
      { source: '/events',     destination: '/work',    permanent: true },
    ]
  },
};

export default nextConfig;
