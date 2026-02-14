#!/usr/bin/env node
/**
 * Scrape ALL text content from https://www.jeffreyepstein.com.au/
 * Extracts: bio, manifesto, headlines, art titles, contact info
 * Output: lib/scraped_text.json
 * Usage: node scripts/scrape-text.mjs
 * Requires: axios, cheerio
 */

import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.jeffreyepstein.com.au";
const OUTPUT_PATH = path.join(__dirname, "../lib/scraped_text.json");

const PAGES = [
  { url: `${BASE_URL}/`, name: "Homepage" },
  { url: `${BASE_URL}/pages/about-us`, name: "About Us" },
  { url: `${BASE_URL}/collections/yes-art`, name: "Ye's Art" },
  { url: `${BASE_URL}/collections/all`, name: "All Products" },
];

async function fetchPage(url) {
  try {
    const res = await axios.get(url, {
      timeout: 10000,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Scraper/1.0)" },
    });
    return res.data;
  } catch (err) {
    console.warn(`[WARN] Failed to fetch ${url}:`, err.message);
    return null;
  }
}

function extractText($, selector) {
  const el = $(selector).first();
  return el.text().trim() || null;
}

function extractAllText($, selector) {
  return $(selector)
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);
}

function extractEmails(html) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = html.match(emailRegex) || [];
  return [...new Set(matches)];
}

function extractPhones($) {
  const phones = new Set();
  $('a[href^="tel:"]').each((_, el) => {
    const href = $(el).attr("href") || "";
    const num = href.replace(/^tel:[\s+]?/, "").replace(/[\s.-]/g, "");
    if (num.length >= 9 && num.length <= 12 && /^[\d+]+$/.test(num)) {
      phones.add(num);
    }
  });
  return [...phones];
}

async function scrape() {
  const result = {
    bio: "",
    manifesto: "",
    headlines: [],
    art_titles: [],
    contact: {
      emails: [],
      phones: [],
    },
    scraped_at: new Date().toISOString(),
  };

  const allArtTitles = new Set();
  const allHeadlines = new Set();
  const allEmails = new Set();
  const allPhones = new Set();

  for (const page of PAGES) {
    const html = await fetchPage(page.url);
    if (!html) continue;

    const $ = cheerio.load(html);

    if (page.name === "About Us") {
      const bioParagraph = $("section p, .about p, [class*='about'] p, main p")
        .first()
        .text()
        .trim();
      if (bioParagraph) {
        result.bio = bioParagraph;
        console.log("[FOUND] Bio:", bioParagraph.slice(0, 80) + "...");
      }

      const paragraphs = $("main p, section p, .content p")
        .map((_, el) => $(el).text().trim())
        .get()
        .filter((t) => t.length > 50);
      if (paragraphs.length > 0 && !result.bio) {
        result.bio = paragraphs[0];
        console.log("[FOUND] Bio (fallback):", result.bio.slice(0, 80) + "...");
      }
    }

    if (page.name === "Homepage") {
      const tagline = $("h1, h2, .tagline, [class*='hero'] h1, [class*='hero'] h2")
        .first()
        .text()
        .trim();
      if (tagline) {
        allHeadlines.add(tagline);
        console.log("[FOUND] Homepage headline:", tagline);
      }

      const manifestoBlock = $(
        "p, .manifesto, [class*='about'] p, section p"
      )
        .map((_, el) => $(el).text().trim())
        .get()
        .filter((t) => t.length > 100);
      if (manifestoBlock.length > 0) {
        result.manifesto = manifestoBlock.join("\n\n");
        console.log("[FOUND] Manifesto block:", manifestoBlock[0].slice(0, 60) + "...");
      }
    }

    const productTitles = $(
      ".product-card__title, .product-title, [class*='product'] h3, .card__title, a[href*='/products/']"
    )
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((t) => t.length > 5 && t.length < 200);

    productTitles.forEach((t) => allArtTitles.add(t));

    const h2h3 = $("h2, h3")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean);
    h2h3.forEach((t) => allHeadlines.add(t));

    const emails = extractEmails(html);
    emails.forEach((e) => allEmails.add(e));

    const phones = extractPhones($);
    phones.forEach((p) => allPhones.add(p));
  }

  result.art_titles = [...allArtTitles];
  result.headlines = [...allHeadlines];
  result.contact.emails = [...allEmails];
  result.contact.phones = [...allPhones];

  if (result.contact.emails.length > 0) {
    console.log("[FOUND] Contact emails:", result.contact.emails.join(", "));
  }
  if (result.contact.phones.length > 0) {
    console.log("[FOUND] Contact phones:", result.contact.phones.join(", "));
  }

  const aboutHtml = await fetchPage(`${BASE_URL}/pages/about-us`);
  if (aboutHtml) {
    const $about = cheerio.load(aboutHtml);
    const aboutParagraphs = $about("p")
      .map((_, el) => $about(el).text().trim())
      .get()
      .filter((t) => t.length > 80);
    if (aboutParagraphs.length > 0 && !result.bio) {
      result.bio = aboutParagraphs[0];
    }
    if (aboutParagraphs.length > 1) {
      result.manifesto = result.manifesto || aboutParagraphs.join("\n\n");
    }
  }

  const libDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(result, null, 2),
    "utf-8"
  );

  console.log("\n--- Scrape complete ---");
  console.log("Sections found:");
  console.log("  - Bio:", result.bio ? "Yes" : "No");
  console.log("  - Manifesto:", result.manifesto ? "Yes" : "No");
  console.log("  - Headlines:", result.headlines.length);
  console.log("  - Art titles:", result.art_titles.length);
  console.log("  - Emails:", result.contact.emails.length);
  console.log("  - Phones:", result.contact.phones.length);
  console.log(`\nOutput saved to: ${OUTPUT_PATH}`);
}

scrape().catch((err) => {
  console.error("[ERROR]", err);
  process.exit(1);
});
