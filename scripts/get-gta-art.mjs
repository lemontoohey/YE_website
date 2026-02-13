#!/usr/bin/env node
/**
 * Download "Theft Auto America" art asset from jeffreyepstein.com.au
 * Tries direct URL first, then searches homepage for alt containing "Theft Auto"
 * Usage: node scripts/get-gta-art.mjs
 */

import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.jeffreyepstein.com.au";
const OUTPUT_PATH = path.join(__dirname, "../public/images/theft-auto-cover.jpg");

const CANDIDATE_URLS = [
  "https://www.jeffreyepstein.com.au/cdn/shop/files/Theft_Auto_America.jpg",
  "https://www.jeffreyepstein.com.au/cdn/shop/files/TheftAutoAmerica.jpg",
];

function resolveUrl(href, base) {
  if (!href || href.startsWith("data:")) return null;
  if (href.startsWith("http")) return href;
  return new URL(href, base).href;
}

async function downloadImage(url, filepath) {
  const res = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 15000,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Scraper/1.0)" },
  });
  fs.writeFileSync(filepath, res.data);
}

async function main() {
  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let imageUrl = null;

  // Try direct URLs first
  for (const url of CANDIDATE_URLS) {
    try {
      await axios.head(url, {
        timeout: 5000,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; Scraper/1.0)" },
        validateStatus: (s) => s < 400,
      });
      imageUrl = url;
      break;
    } catch {
      continue;
    }
  }

  // Search homepage and key pages for image with alt containing "Theft Auto"
  if (!imageUrl) {
    const pagesToSearch = ["/", "/pages/yes-art", "/pages/more-ye", "/collections/all"];
    for (const path of pagesToSearch) {
      try {
        const html = await axios.get(BASE_URL + path, {
          timeout: 10000,
          headers: { "User-Agent": "Mozilla/5.0 (compatible; Scraper/1.0)" },
        });
        const $ = cheerio.load(html.data);
        $("img[alt], img[src]").each((_, el) => {
          const alt = ($(el).attr("alt") || "").toLowerCase();
          const src = $(el).attr("src");
          if (src && (alt.includes("theft auto") || src.toLowerCase().includes("theft") || src.toLowerCase().includes("auto_america"))) {
            let s = src;
            if (s.startsWith("//")) s = "https:" + s;
            imageUrl = resolveUrl(s, BASE_URL);
            return false;
          }
        });
        if (imageUrl) break;
      } catch {
        continue;
      }
    }
  }

  if (!imageUrl) {
    console.error("[ERROR] Could not find Theft Auto America image. Tried direct URLs and homepage search.");
    process.exit(1);
  }

  await downloadImage(imageUrl, OUTPUT_PATH);
  console.log("Asset Secured");
}

main().catch((err) => {
  console.error("[ERROR]", err.message);
  process.exit(1);
});
