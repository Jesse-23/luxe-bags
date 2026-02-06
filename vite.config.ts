import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
<<<<<<< HEAD
=======
import { componentTagger } from "lovable-tagger";
>>>>>>> 931b57c9054f3250816b51925f3f01ccd6b4d1ed

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
<<<<<<< HEAD
    port: 7070,
  },
  plugins: [react()].filter(Boolean),
=======
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
>>>>>>> 931b57c9054f3250816b51925f3f01ccd6b4d1ed
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
