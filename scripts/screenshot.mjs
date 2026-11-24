// Phone-screen screenshots (what you see without scrolling) of the running dev server.
// Usage: node scripts/screenshot.mjs [path ...]   e.g. node scripts/screenshot.mjs / /skills
// Needs `bun run dev` running (http://localhost:8080). Saves to .preview/*.png
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium, devices } = require("playwright");

const base = process.env.PREVIEW_URL || "http://localhost:8080";
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/"];
mkdirSync(".preview", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ ...devices["iPhone 14"] });
for (const path of paths) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const name = path === "/" ? "home" : path.replace(/^\//, "").replace(/[^\w-]+/g, "_");
  const file = `.preview/${name}.png`;
  await page.screenshot({ path: file, fullPage: false });
  console.log(file);
}
await browser.close();
