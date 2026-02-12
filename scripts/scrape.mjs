#!/usr/bin/env node
/**
 * Scrape content from https://www.jeffreyepstein.com.au/
 * Usage: node scripts/scrape.mjs
 * Requires: npm install axios cheerio
 */

import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.jeffreyepstein.com.au";
const IMG_DIR = path.join(__dirname, "../public/images/scraped");
const OUTPUT_JSON = path.join(__dirname, "../src/lib/scraped_content.json");

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
  console.log("\n=== Scraping jeffreyepstein.com.au ===\n");

  if (!fs.existsSync(IMG_DIR)) {
    fs.mkdirSync(IMG_DIR, { recursive: true });
    console.log(`[CREATED] Folder: public/images/scraped/`);
  }

  const scraped = {
    hero: { title: "", subtitle: "" },
    about: { text: "" },
    images: [],
    gallery: [],
  };

  const html = await fetchPage(BASE_URL + "/");
  if (!html) {
    console.log("[ABORT] Could not fetch homepage.");
    process.exit(1);
  }

  const $ = cheerio.load(html);

  // --- IMAGES ---
  const imgUrls = new Set();
  $("img[src]").each((_, el) => {
    const src = $(el).attr("src");
    if (!src) return;
    let url = src;
    if (url.startsWith("//")) url = "https:" + url;
    if (url.startsWith("/")) url = BASE_URL + url;
    if (!url.startsWith("http")) url = BASE_URL + "/" + url.replace(/^\//, "");
    if (!url.includes("shopify") && !url.includes("data:")) {
      imgUrls.add(url);
    }
  });

  console.log(`[FOUND] ${imgUrls.size} image(s) on homepage`);

  let downloaded = 0;
  for (const url of imgUrls) {
    const ext = path.extname(new URL(url).pathname) || ".jpg";
    const filename = `scraped_${downloaded + 1}${ext}`;
    const filepath = path.join(IMG_DIR, filename);
    const ok = await downloadImage(url, filepath);
    if (ok) {
      scraped.images.push({ url, filename: `images/scraped/${filename}` });
      scraped.gallery.push({
        src: `/images/scraped/${filename}`,
        alt: "Portfolio image",
        category: "Portrait",
      });
      console.log(`[SAVED] ${filename}`);
      downloaded++;
    }
  }

  // --- HERO / ABOUT TEXT ---
  const h1 = $("h1").first().text().trim();
  const h2 = $("h2").first().text().trim();
  const tagline = $('[class*="tagline"], [class*="hero"], .hero').first().text().trim();

  if (h1) scraped.hero.title = h1;
  if (h2) scraped.hero.subtitle = h2;
  if (tagline && !scraped.hero.subtitle) scraped.hero.subtitle = tagline;

  const aboutSelectors = [
    "[class*='about'] p",
    ".about p",
    "[id*='about'] p",
    "section p",
    "main p",
  ];
  for (const sel of aboutSelectors) {
    const texts = [];
    $(sel).each((_, el) => {
      const t = $(el).text().trim();
      if (t && t.length > 50) texts.push(t);
    });
    if (texts.length) {
      scraped.about.text = texts.join("\n\n");
      break;
    }
  }

  if (!scraped.about.text) {
    const allP = [];
    $("p").each((_, el) => {
      const t = $(el).text().trim();
      if (t && t.length > 80) allP.push(t);
    });
    if (allP.length) scraped.about.text = allP.slice(0, 3).join("\n\n");
  }

  // Try portfolio page
  const portfolioHtml = await fetchPage(BASE_URL + "/pages/portfolio");
  if (portfolioHtml) {
    const $p = cheerio.load(portfolioHtml);
    $p("img[src]").each((_, el) => {
      const src = $p(el).attr("src");
      if (!src) return;
      let url = src.startsWith("//") ? "https:" + src : src.startsWith("/") ? BASE_URL + src : BASE_URL + "/" + src;
      if (!url.includes("shopify") && !url.includes("data:")) imgUrls.add(url);
    });
    console.log(`[CHECKED] Portfolio page`);
  }

  // Write JSON
  const libDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(scraped, null, 2), "utf8");
  console.log(`[SAVED] src/lib/scraped_content.json`);

  console.log("\n--- Summary ---");
  console.log(`Hero title: "${scraped.hero.title}"`);
  console.log(`Hero subtitle: "${scraped.hero.subtitle}"`);
  console.log(`About text length: ${scraped.about.text?.length ?? 0} chars`);
  console.log(`Images downloaded: ${downloaded}`);
  console.log("\nDone.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
