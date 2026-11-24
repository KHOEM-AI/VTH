import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";

// Read KI master token on the development server only.
// Never expose this token to the browser or frontend bundle.
function readKIToken() {
  const envPath = resolve(homedir(), "KI", ".env");
  if (!existsSync(envPath)) return "";

  const content = readFileSync(envPath, "utf8");
  const value = content.match(/^KI_API_TOKEN=(.*)$/m)?.[1]?.trim() || "";

  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
     (value.startsWith("'") && value.endsWith("'")))
  ) return value.slice(1, -1);

  return value;
}

const kiToken = readKIToken();

export default defineConfig({
  plugins: [react()],
  base: "/VTH/",
  server: {
    proxy: {
      "/ki-api": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ki-api/, ""),
        configure(proxy) {
          proxy.on("proxyReq", (proxyReq) => {
            if (kiToken) {
              proxyReq.setHeader("x-ki-token", kiToken);
            }
          });
        }
      }
    }
  }
});
