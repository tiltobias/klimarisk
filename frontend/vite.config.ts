import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/klimarisk/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("leaflet")) return "vendor-leaflet";
            if (id.includes("recharts")) return "vendor-recharts";
            if (id.includes("@react-pdf")) return "vendor-react-pdf-renderer";
            if (id.includes("pdfjs")) return "vendor-pdfjs";
            if (["zustand", "floating-ui", "lucide", "react-pdf"].some(s => id.includes(s))) return "vendor-s";
            return "vendor";
          }
        }
      }
    }
  }
})
