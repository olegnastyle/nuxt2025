import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@pinia/nuxt',
  ],
});