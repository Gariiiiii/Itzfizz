// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: "export",

//   basePath: "/Itzfizz",

//   images: {
//     unoptimized: true,
//   },

//   trailingSlash: true,

//   turbopack: {
//     rules: {
//       "*.css": {
//         loaders: ["@tailwindcss/turbopack"],
//         as: "*.css",
//       },
//     },
//   },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: "export",

//   images: {
//     unoptimized: true,
//   },

//   trailingSlash: true,

//   turbopack: {
//     rules: {
//       "*.css": {
//         loaders: ["@tailwindcss/turbopack"],
//         as: "*.css",
//       },
//     },
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",

  ...(isProd && {
    basePath: "/Itzfizz",
  }),

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
