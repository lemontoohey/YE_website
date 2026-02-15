#!/usr/bin/env node
/**
 * THE HEIST - Scrape full product catalog from jeffreyepstein.com.au
 * Downloads images to public/images/evidence/
 * Output: lib/evidence_locker.json
 * Usage: node scripts/heist.mjs
 * Requires: axios, cheerio
 */

import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.jeffreyepstein.com.au";
const EVIDENCE_DIR = path.join(__dirname, "../public/images/evidence");
const OUTPUT_PATH = path.join(__dirname, "../src/lib/evidence_locker.json");

const COLLECTION_URLS = [
  `${BASE_URL}/collections/yes-art`,
  `${BASE_URL}/collections/all`,
];

function resolveUrl(href, base) {
  if (!href || href.startsWith("data:")) return null;
  if (href.startsWith("http")) return href;
  return new URL(href, base).href;
}

async function fetchPage(url) {
  try {
    const res = await axios.get(url, {
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
    });
    return res.data;
  } catch (err) {
    console.warn(`[WARN] Failed to fetch ${url}:`, err.message);
    return null;
  }
}

async function downloadImage(url, filepath) {
  try {
    const res = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 20000,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Scraper/1.0)" },
    });
    fs.writeFileSync(filepath, res.data);
    return true;
  } catch (err) {
    console.error(`[ERROR] Download failed:`, err.message);
    return false;
  }
}

function getBestImageUrl($, productUrl) {
  let best = null;
  $("img[src]").each((_, el) => {
    let src = $(el).attr("src");
    if (!src || src.includes("favicon") || src.includes("data:")) return;
    if (src.startsWith("//")) src = "https:" + src;
    if (src.startsWith("/")) src = BASE_URL + src;
    const resolved = resolveUrl(src, productUrl);
    if (resolved && !resolved.includes("shopify") && !resolved.includes("placeholder")) {
      const size = src.match(/\d+x\d+/);
      if (!best || (size && !best.includes("x"))) best = resolved;
    }
  });
  $("img[srcset]").each((_, el) => {
    const srcset = $(el).attr("srcset");
    if (!srcset) return;
    const entries = srcset.split(",").map((e) => e.trim().split(/\s+/));
    const largest = entries
      .filter(([u]) => u && !u.includes("placeholder"))
      .sort((a, b) => {
        const wA = parseInt((a[1] || "0").replace("w", ""), 10) || 0;
        const wB = parseInt((b[1] || "0").replace("w", ""), 10) || 0;
        return wB - wA;
      })[0];
    if (largest) {
      let u = largest[0];
      if (u.startsWith("//")) u = "https:" + u;
      if (u.startsWith("/")) u = BASE_URL + u;
      best = resolveUrl(u, productUrl);
    }
  });
  return best;
}

async function heist() {
  console.log("\n=== THE HEIST: Securing assets from jeffreyepstein.com.au ===\n");

  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
    console.log(`[CREATED] ${EVIDENCE_DIR}\n`);
  }


  const products = new Map();
  let html = null;
  let usedUrl = "";

  for (const url of COLLECTION_URLS) {
    html = await fetchPage(url);
    if (html) {
      usedUrl = url;
      break;
    }
  }

  if (!html) {
    console.error("[ABORT] Could not fetch any collection page.");
    process.exit(1);
  }

  const $ = cheerio.load(html);

  const productLinks = new Set();
  $('a[href*="/products/"]').each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const full = resolveUrl(href, BASE_URL);
    if (full && full.includes("/products/") && !full.includes("?")) productLinks.add(full);
  });

  let links = [...productLinks];
  if (links.length === 0) {
    $('a[href*="products"]').each((_, el) => {
      const href = $(el).attr("href");
      if (href) productLinks.add(resolveUrl(href, BASE_URL));
    });
    links = [...productLinks];
  }
  console.log(`[FOUND] ${links.length} product(s)\n`);

  let id = 1;
  for (const productUrl of links) {
    const pageHtml = await fetchPage(productUrl);
    if (!pageHtml) continue;

    const $p = cheerio.load(pageHtml);

    const title =
      $p("h1").first().text().trim() ||
      $p(".product__title").text().trim() ||
      $p("[class*='product-title']").first().text().trim() ||
      "Untitled";

    let price =
      $p(".price").first().text().trim() ||
      $p("[class*='price']").first().text().trim() ||
      "";
    const priceMatch = price.match(/\$[\d,.]+(?:\s*(?:AUD|USD))?/);
    if (priceMatch) price = priceMatch[0].trim();

    const description =
      $p(".product__description").text().trim() ||
      $p("[class*='description']").first().text().trim() ||
      title;

    const imgUrl = getBestImageUrl($p, productUrl);
    if (!imgUrl) continue;

    const ext = path.extname(new URL(imgUrl).pathname) || ".jpg";
    const filename = `evidence_${id}${ext}`;
    const filepath = path.join(EVIDENCE_DIR, filename);

    console.log(`Securing asset: ${title}...`);
    const ok = await downloadImage(imgUrl, filepath);
    if (!ok) continue;

    products.set(productUrl, {
      id,
      title,
      src: `/images/evidence/${filename}`,
      price: price || null,
      description: description || title,
    });
    id++;
  }

  const evidence = [...products.values()];
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(evidence, null, 2), "utf-8");

  console.log(`\n[SUCCESS] Secured ${evidence.length} asset(s)`);
  console.log(`[OUTPUT] ${OUTPUT_PATH}\n`);
}

heist().catch((err) => {
  console.error("[ERROR]", err);
  process.exit(1);
});
