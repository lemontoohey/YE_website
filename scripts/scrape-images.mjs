#!/usr/bin/env node
/**
 * Scrape largest images from https://www.jeffreyepstein.com.au/
 * Downloads top 3 images to public/images/gta/
 * Usage: node scripts/scrape-images.mjs
 * Requires: npm install axios cheerio
 */

import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.jeffreyepstein.com.au";
const IMG_DIR = path.join(__dirname, "../public/images/gta");

async function fetchPage(url) {
  try {
    const res = await axios.get(url, {
      timeout: 10000,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Scraper/1.0)" },
    });
    return res.data;
  } catch (err) {
    console.error(`[ERROR] Failed to fetch ${url}:`, err.message);
    return null;
  }
}

function resolveUrl(href, base) {
  if (!href || href.startsWith("data:")) return null;
  if (href.startsWith("http")) return href;
  const baseUrl = new URL(base);
  return new URL(href, baseUrl).href;
}

async function getImageSize(url) {
  try {
    const res = await axios.head(url, {
      timeout: 8000,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Scraper/1.0)" },
      maxRedirects: 5,
      validateStatus: (s) => s < 400,
    });
    const contentLength = res.headers["content-length"];
    return contentLength ? parseInt(contentLength, 10) : 0;
  } catch {
    return 0;
  }
}

async function downloadImage(url, filepath) {
  try {
    const res = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Scraper/1.0)" },
    });
    fs.writeFileSync(filepath, res.data);
    return true;
  } catch (err) {
    console.error(`[ERROR] Failed to download ${url}:`, err.message);
    return false;
  }
}

async function main() {
  console.log("\n=== Scraping images from jeffreyepstein.com.au for GTA gatekeeper ===\n");

  if (!fs.existsSync(IMG_DIR)) {
    fs.mkdirSync(IMG_DIR, { recursive: true });
    console.log(`[CREATED] Folder: public/images/gta/`);
  }

  const html = await fetchPage(BASE_URL + "/");
  if (!html) {
    console.log("[ABORT] Could not fetch homepage.");
    process.exit(1);
  }

  const $ = cheerio.load(html);

  // Collect all image URLs
  const imgUrls = new Set();
  $("img[src]").each((_, el) => {
    let src = $(el).attr("src");
    if (!src) return;
    if (src.startsWith("//")) src = "https:" + src;
    if (src.startsWith("/")) src = BASE_URL + src;
    if (!src.startsWith("http")) src = BASE_URL + "/" + src.replace(/^\//, "");
    if (!src.includes("shopify") && !src.includes("data:") && !src.includes("favicon")) {
      imgUrls.add(src);
    }
  });

  // Prefer srcset for larger variants
  $("img[srcset]").each((_, el) => {
    const srcset = $(el).attr("srcset");
    if (!srcset) return;
    srcset.split(",").forEach((entry) => {
      const url = entry.trim().split(/\s+/)[0];
      if (!url) return;
      const resolved = resolveUrl(url, BASE_URL);
      if (resolved && !resolved.includes("shopify") && !resolved.includes("data:")) {
        imgUrls.add(resolved);
      }
    });
  });

  const urls = [...imgUrls];
  console.log(`[FOUND] ${urls.length} image(s) on homepage`);

  if (urls.length === 0) {
    console.log("[WARN] No images found. Try checking the site manually.");
    process.exit(0);
  }

  // Get sizes (by Content-Length) and sort largest first
  const withSizes = await Promise.all(
    urls.map(async (url) => ({ url, size: await getImageSize(url) }))
  );
  withSizes.sort((a, b) => b.size - a.size);

  const top3 = withSizes.slice(0, 3);
  let downloaded = 0;

  for (let i = 0; i < top3.length; i++) {
    const { url } = top3[i];
    const ext = path.extname(new URL(url).pathname) || ".jpg";
    const filename = `loading_screen_${i + 1}${ext}`;
    const filepath = path.join(IMG_DIR, filename);
    const ok = await downloadImage(url, filepath);
    if (ok) {
      console.log(`[SAVED] ${filename}`);
      downloaded++;
    }
  }

  console.log(`\n[SUCCESS] Downloaded ${downloaded} image(s) to public/images/gta/\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
