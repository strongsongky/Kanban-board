import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
  },
});
