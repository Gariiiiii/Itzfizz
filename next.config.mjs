/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/Itzfizz",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
