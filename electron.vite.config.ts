import { defineConfig } from 'electron-vite'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        output: { format: 'cjs' },
      },
    },
  },
  preload: {
    build: {
      // Sandboxed preloads require a single CommonJS bundle.
      rollupOptions: {
        output: { format: 'cjs', inlineDynamicImports: true },
      },
    },
  },
  renderer: {
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
    },
  },
})
