/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Itzfizz",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
