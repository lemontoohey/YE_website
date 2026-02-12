#!/usr/bin/env node
/**
 * Download a sub bass thud (atmospheric audio) for use with useSoundEffect.
 *
 * The project ships with a generated thud.mp3 (55Hz sine, ~1.2s). To replace it
 * with a higher-quality sample:
 *
 * Manual download:
 * - Freesound (CC0): https://freesound.org/people/Geoff-Bremner-Audio/sounds/751923/
 *   "Short Sub Bass Drop C 65hz" - requires account to download
 * - Pixabay: https://pixabay.com/sound-effects/search/thud/ - "thud bassy bump2"
 * - Mixkit: https://mixkit.co/free-sound-effects/thud/ - "Golem stomp" or "Quest game heavy stomp"
 *
 * Usage:
 *   node scripts/download-sound.js <url>
 *
 * Example:
 *   node scripts/download-sound.js "https://example.com/sound.mp3"
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const OUT = path.join(__dirname, "../public/sounds/thud.mp3");

async function download(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(OUT);
    client
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode === 302 || res.statusCode === 301) {
          download(res.headers.location).then(resolve).catch(reject);
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(OUT, () => {});
        reject(err);
      });
  });
}

const url = process.argv[2];
if (!url) {
  console.log(require("path").basename(__filename) + ": usage: node download-sound.js <url>");
  console.log("See script header for recommended sources.");
  process.exit(1);
}

download(url)
  .then(() => console.log("Saved to public/sounds/thud.mp3"))
  .catch((err) => {
    console.error("Download failed:", err.message);
    process.exit(1);
  });
