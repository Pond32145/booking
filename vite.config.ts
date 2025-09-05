import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

import vitePluginInjectDataLocator from "./plugins/vite-plugin-inject-data-locator";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginInjectDataLocator(), tailwindcss()],
  server: {
    allowedHosts: true,
  },
  
  // Performance optimizations
  build: {
    // Target modern browsers for better performance
    target: 'es2015',
    
    // Enable minification
    minify: 'terser',
    
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['@heroui/react', 'framer-motion'],
          'icon-vendor': ['@iconify/react']
        },
        
        // Optimize chunk file names for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    
    // Compress assets
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },
  
  // Enable CSS code splitting
  css: {
    devSourcemap: true
  }
});
