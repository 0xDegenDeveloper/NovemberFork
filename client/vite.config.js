// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import { svelte } from "@sveltejs/vite-plugin-svelte";
// import inject from "@rollup/plugin-inject";
// import nodePolyfills from "rollup-plugin-polyfill-node";

// export default defineConfig({
//   base: "./",
//   // Node.js global to browser globalThis
//   define: {
//     global: "globalThis",
//   },
//   plugins: [
//     svelte(),
//     inject({
//       util: "util/",
//       modules: {
//         Buffer: ["buffer", "Buffer"],
//         process: ["process"],
//       },
//     }),
//     react(),
//   ],
//   build: {
//     rollupOptions: {
//       input: ["src/main.jsx", "src/polyfill.js"],
//       plugins: [nodePolyfills()],
//     },
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },
// });

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
