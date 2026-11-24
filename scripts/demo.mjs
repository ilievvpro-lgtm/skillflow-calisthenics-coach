// Records a phone-screen video of the running dev server and saves an MP4 that plays
// in the Claude mobile app. Needs `bun run dev` running (http://localhost:8080).
//
// Usage:
//   node scripts/demo.mjs                 # default tour through every tab
//   node scripts/demo.mjs steps.json      # custom steps
//
// Steps file: a JSON array, run in order. Each step is one of:
//   { "goto": "/skills" }                 open a page
//   { "click": "text=Skills" }            tap something (Playwright selector)
//   { "type": ["textarea", "Здравей"] }   type into a field
//   { "press": "Enter" }                  press a key
//   { "scroll": 600 }                     scroll down (negative = up)
//   { "wait": 1500 }                      pause, in ms
//   { "waitFor": "text=Готово" }          wait until something appears (max 60 s)
// Output: .preview/demo.mp4 (or .webm if ffmpeg is missing)
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync, rmSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium, devices } = require("playwright");

const base = process.env.PREVIEW_URL || "http://localhost:8080";
const defaultTour = [
  { goto: "/" },
  { wait: 1500 },
  { click: "nav >> text=Technique" },
  { wait: 1500 },
  { scroll: 500 },
  { wait: 800 },
  { click: "nav >> text=Skills" },
  { wait: 1500 },
  { scroll: 600 },
  { wait: 800 },
  { click: "nav >> text=My Story" },
  { wait: 1500 },
  { scroll: 600 },
  { wait: 1200 },
  { click: "nav >> text=Coach" },
  { wait: 1200 },
];
const steps = process.argv[2] ? JSON.parse(readFileSync(process.argv[2], "utf8")) : defaultTour;

const dir = ".preview/video";
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });

const phone = devices["iPhone 14"];
const browser = await chromium.launch();
const context = await browser.newContext({
  ...phone,
  recordVideo: { dir, size: phone.viewport },
});
const page = await context.newPage();

for (const step of steps) {
  if (step.goto) await page.goto(base + step.goto, { waitUntil: "networkidle" });
  else if (step.click) await page.locator(step.click).first().click();
  else if (step.type)
    await page.locator(step.type[0]).first().pressSequentially(step.type[1], { delay: 40 });
  else if (step.press) await page.keyboard.press(step.press);
  else if (step.scroll) await page.mouse.wheel(0, step.scroll);
  else if (step.waitFor) await page.locator(step.waitFor).first().waitFor({ timeout: 60_000 });
  if (step.wait) await page.waitForTimeout(step.wait);
  else await page.waitForTimeout(400);
}

const video = page.video();
await context.close();
await browser.close();
const webm = await video.path();

try {
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    webm,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-vf",
    "scale=trunc(iw/2)*2:trunc(ih/2)*2",
    ".preview/demo.mp4",
  ]);
  console.log(".preview/demo.mp4");
} catch {
  renameSync(webm, ".preview/demo.webm");
  console.log(".preview/demo.webm (ffmpeg not found)");
}
