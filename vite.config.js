import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: "127.0.0.1",
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
  },
});
