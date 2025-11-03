import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5174,
    host: true, // Allow external connections
    open: true, // Auto-open browser
    cors: true, // Enable CORS
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          pdf: ['jspdf']
        }
      }
    }
  },
  
  // Dependency optimization
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['jspdf', 'react', 'react-dom']
  },
  
  // ✅ Asset handling (include _redirects file)
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.pdf', '_redirects'],
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  }
});
