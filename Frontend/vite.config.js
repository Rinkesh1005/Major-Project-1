// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Avoid __DEFINES__ not defined error
    __DEFINES__: {},
  },
  build: {
    target: 'esnext',
    sourcemap: false,
  },
  server: {
    fs: {
      strict: false, // Helps with Vercel deployment sometimes
    },
  },
})
