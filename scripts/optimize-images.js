#!/usr/bin/env node
/**
 * Optimize local images for web.
 * Hero: max 1920px width. Gallery & About: max 800px width.
 *
 * Usage: npm run optimize-images
 * Backup first: cp -r public/images public/images-backup
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const HERO_MAX_WIDTH = 1920;
const GALLERY_MAX_WIDTH = 800;
const QUALITY = 85;

async function optimizeImage(filePath, maxWidth) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    console.log(`  Skip (unsupported): ${path.basename(filePath)}`);
    return;
  }

  let pipeline = sharp(filePath).resize(maxWidth, null, { withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 6 });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  }

  const buffer = await pipeline.toBuffer();
  await fs.promises.writeFile(filePath, buffer);
  console.log(`  ✓ ${path.basename(filePath)}`);
}

async function processDir(dir, maxWidth) {
  const fullPath = path.join(IMAGES_DIR, dir);
  if (!fs.existsSync(fullPath)) return;

  const files = fs.readdirSync(fullPath).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  if (files.length === 0) return;

  console.log(`\n${dir}/ (max ${maxWidth}px):`);
  for (const file of files) {
    await optimizeImage(path.join(fullPath, file), maxWidth);
  }
}

async function main() {
  console.log("Optimizing images...");

  await processDir("hero", HERO_MAX_WIDTH);
  await processDir("portfolio", GALLERY_MAX_WIDTH);
  await processDir("about", GALLERY_MAX_WIDTH);

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
