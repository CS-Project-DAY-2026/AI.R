import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        studio: resolve(__dirname, "studio.html"),
        basics: resolve(__dirname, "basics.html"),
        gym: resolve(__dirname, "gym.html"),
        integrity: resolve(__dirname, "integrity.html"),
        teachers: resolve(__dirname, "teachers.html"),
        faq: resolve(__dirname, "faq.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
