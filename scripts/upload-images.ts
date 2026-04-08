/**
 * upload-images.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Uploads all local car images to Cloudinary, organized per-car.
 *
 * HOW CAR-IMAGE ASSOCIATION WORKS:
 * ──────────────────────────────────────────────────────────────────────────
 * Each car has a defined slug and a set of image filenames below in CAR_GROUPS.
 * During upload, each image is stored in Cloudinary at:
 *
 *   elite-motor-cars/{car-slug}/{image-filename-without-ext}
 *
 * For example:
 *   car37-1.jpeg  →  elite-motor-cars/2007-mitsubishi-lancer-evo-x-gsr/car37-1
 *   car34-9.jpg   →  elite-motor-cars/2007-lexus-ls600h-v8-5000cc/car34-9
 *
 * This makes Cloudinary organized by car, not just a flat bucket.
 *
 * The output cloudinary-map.json is a flat map:
 *   { "car37-1.jpeg": "https://res.cloudinary.com/..." }
 *
 * seed.ts uses this map to look up URLs by filename for each car's imageFiles[].
 *
 * RUN ORDER:
 *   1. npm run upload-images    → produces scripts/cloudinary-map.json
 *   2. npm run seed             → seeds MongoDB using Cloudinary URLs
 *
 * PREREQUISITES (.env.local):
 *   CLOUDINARY_CLOUD_NAME=your_cloud_name
 *   CLOUDINARY_API_KEY=your_api_key
 *   CLOUDINARY_API_SECRET=your_api_secret
 */

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// ── Cloudinary config ──────────────────────────────────────────────────────

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("❌  Missing Cloudinary env vars. Check .env.local");
  process.exit(1);
}

// ── Constants ──────────────────────────────────────────────────────────────

const ASSETS_DIR = path.resolve(process.cwd(), "src/assets");
const OUTPUT_MAP = path.resolve(process.cwd(), "scripts/cloudinary-map.json");
const CLOUDINARY_ROOT = "elite-motor-cars";
const CONCURRENCY = 5;

// ── Per-car image groups ───────────────────────────────────────────────────
// This table EXPLICITLY maps each car's slug → its image filenames.
// This is how images are correctly associated to their car in Cloudinary.
// Images are uploaded under:  elite-motor-cars/{car-slug}/{filename-without-ext}

const CAR_GROUPS: Array<{ slug: string; files: string[] }> = [
  {
    slug: "2007-mitsubishi-lancer-evolution-x-gsr-ryushon",
    files: ["car37.jpeg","car37-1.jpeg","car37-2.jpeg","car37-3.jpeg","car37-4.jpeg","car37-5.jpeg","car37-6.jpeg","car37-7.jpeg","car37-8.jpeg","car37-9.jpeg","car37-10.jpeg","car37-11.jpeg","car37-12.jpeg","car37-13.jpeg","car37-14.jpeg","car37-15.jpeg","car37-16.jpeg"],
  },
  {
    slug: "2007-lexus-ls600h-v8-5000cc",
    files: ["car34-1.jpg","car34-2.jpg","car34-3.jpg","car34-4.jpg","car34-5.jpg","car34-6.jpg","car34-7.jpg","car34-8.jpg","car34-9.jpg"],
  },
  {
    slug: "2007-lexus-ls460-v8-4600cc",
    files: ["car35-1.jpg","car35-2.jpg","car35-3.jpg","car35-4.jpg","car35-5.jpg","car35-6.jpg","car35-7.jpg","car35-8.jpg","car35-9.jpg"],
  },
  {
    slug: "2013-toyota-prius-hybrid",
    files: ["car36-1.jpg","car36-2.jpg","car36-3.jpg","car36-4.jpg","car36-5.jpg","car36-6.jpg"],
  },
  {
    slug: "toyota-prius-2011",
    files: ["car1.avif","car1-1.avif","car1-2.avif","car1-3.avif","car1-4.avif","car1-5.avif","car1-6.avif","car1-7.avif"],
  },
  {
    slug: "toyota-crown-sedan-2010",
    files: ["car2.avif","car2-1.avif","car2-2.avif","car2-3.avif","car2-4.avif","car2-5.avif","car2-6.avif","car2-7.avif","car2-8.avif"],
  },
  {
    slug: "honda-vezel-2014",
    files: ["car3.avif","car3-1.avif","car3-2.avif","car3-3.avif","car3-4.avif","car3-5.avif","car3-6.avif","car3-7.avif","car3-8.avif"],
  },
  {
    slug: "lexus-ls460-v8-2012",
    files: ["car4.avif","car4-1.avif","car4-2.avif","car4-3.avif","car4-4.avif","car4-5.avif","car4-6.avif","car4-7.avif"],
  },
  {
    slug: "lexus-ls460-2006-v8-luxury",
    files: ["car5.avif","car5-1.avif","car5-2.avif","car5-3.avif","car5-4.avif","car5-5.avif","car5-6.avif","car5-7.avif","car5-8.avif"],
  },
  {
    slug: "mitsubishi-lancer-evolution-2007",
    files: ["car6.avif","car6-1.avif","car6-2.avif","car6-3.avif","car6-4.avif","car6-5.avif","car6-6.avif","car6-7.avif","car6-8.avif"],
  },
  {
    slug: "lexus-ls460-v8-2007",
    files: ["car7.avif","car7-1.avif","car7-2.avif","car7-3.avif","car7-4.avif","car7-5.avif","car7-6.avif","car7-7.avif","car7-8.avif"],
  },
  {
    slug: "toyota-chr-hybrid-g-mode-nero",
    files: ["car8.avif","car8-1.avif","car8-2.avif","car8-3.avif","car8-4.avif","car8-5.avif","car8-6.avif","car8-7.avif","car8-8.avif"],
  },
  {
    slug: "mercedes-benz-s400h-hybrid",
    files: ["car9.avif","car9-1.avif","car9-2.avif","car9-3.avif","car9-4.avif","car9-5.avif","car9-6.avif","car9-7.avif","car9-8.avif"],
  },
  {
    slug: "honda-grace-hybrid-ex-2015",
    files: ["car10.avif","car10-1.avif","car10-2.avif","car10-3.avif","car10-4.avif","car10-5.avif","car10-6.avif","car10-7.avif"],
  },
  {
    slug: "toyota-yaris-hybrid-g-awd-2020",
    files: ["car11.avif","car11-1.avif","car11-2.avif","car11-3.avif","car11-4.avif","car11-5.avif","car11-6.avif","car11-7.avif"],
  },
  {
    slug: "lexus-ls460-v8-rwd-2013",
    files: ["car12.avif","car12-1.avif","car12-2.avif","car12-3.avif","car12-4.avif","car12-5.avif","car12-6.avif","car12-7.avif","car12-8.avif"],
  },
  {
    slug: "honda-fit-hybrid-ehev",
    files: ["car13.avif","car13-1.avif","car13-2.avif","car13-3.avif","car13-4.avif","car13-5.avif","car13-6.avif"],
  },
  {
    slug: "suzuki-swift-hybrid-hatchback",
    files: ["car14.avif","car14-1.avif","car14-2.avif","car14-3.avif","car14-4.avif","car14-5.avif","car14-6.avif","car14-7.avif"],
  },
  {
    slug: "honda-fit-hybrid-2018",
    files: ["car15.avif","car15-1.avif","car15-2.avif","car15-3.avif","car15-4.avif","car15-5.avif","car15-6.avif","car15-7.avif"],
  },
  {
    slug: "toyota-crown-rs-advance-2019",
    files: ["car16.avif","car16-1.avif","car16-2.avif","car16-3.avif","car16-4.avif","car16-5.avif","car16-6.avif"],
  },
  {
    slug: "lexus-ls460-v8-rwd-2007",
    files: ["car17.avif","car17-1.avif","car17-2.avif","car17-3.avif","car17-4.avif","car17-5.avif"],
  },
  {
    slug: "honda-vezel-hybrid-2014",
    files: ["car18.avif","car18-1.avif","car18-2.avif","car18-3.avif","car18-4.avif","car18-5.avif","car18-6.avif"],
  },
  {
    slug: "toyota-chr-hybrid-2018",
    files: ["car19.avif","car19-1.avif","car19-2.avif","car19-3.avif","car19-4.avif","car19-5.avif","car19-6.avif","car19-7.avif","car19-8.avif"],
  },
  {
    slug: "2007-lexus-ls600hl-v8-5000cc",
    files: ["car20.jpg","car20-1.jpg","car20-2.jpg","car20-3.jpg","car20-4.jpg","car20-5.jpg","car20-6.jpg","car20-7.jpg","car20-8.jpg","car20-9.jpg"],
  },
  {
    slug: "2013-bmw-m5-f10-44l-twin-turbo-v8",
    files: ["car21.jpg","car21-1.jpg","car21-2.jpg","car21-3.jpg","car21-4.jpg","car21-5.jpg","car21-6.jpg","car21-7.jpg"],
  },
  {
    slug: "2024-yaris-hybrid-4wd",
    files: ["car22.jpg","car22-1.jpg","car22-2.jpg","car22-3.jpg","car22-4.jpg","car22-5.jpg","car22-6.jpg","car22-7.jpg","car22-8.jpg"],
  },
  {
    slug: "2009-crown-35l-v6-hybrid",
    files: ["car23.jpg","car23-1.jpg","car23-2.jpg","car23-3.jpg","car23-4.jpg","car23-5.jpg","car23-6.jpg","car23-7.jpg","car23-8.jpg","car23-9.jpg"],
  },
  {
    slug: "2018-toyota-prius-c-hybrid",
    files: ["car24.jpg","car24-1.jpg","car24-2.jpg","car24-3.jpg","car24-4.jpg","car24-5.jpg","car24-6.jpg","car24-7.jpg","car24-8.jpg"],
  },
  {
    slug: "2014-toyota-prius-c-aqua",
    files: ["car25.jpg","car25-1.jpg","car25-2.jpg","car25-3.jpg","car25-4.jpg","car25-5.jpg"],
  },
  {
    slug: "2020-yaris-hybrid-x-4wd",
    files: ["car26.jpg","car26-1.jpg","car26-2.jpg","car26-3.jpg","car26-4.jpg","car26-5.jpg","car26-6.jpg"],
  },
  {
    slug: "2020-yaris-hybrid-z-4wd",
    files: ["car27.jpg","car27-1.jpg","car27-2.jpg","car27-3.jpg","car27-4.jpg","car27-5.jpg","car27-6.jpg","car27-7.jpg","car27-8.jpg","car27-9.jpg"],
  },
  {
    slug: "2014-lexus-ct200h-f-sport",
    files: ["car28.jpg","car28-1.jpg","car28-2.jpg","car28-3.jpg","car28-4.jpg","car28-5.jpg","car28-6.jpg","car28-7.jpg"],
  },
  {
    slug: "2020-lexus-ct200h-hybrid",
    files: ["car29.jpg","car29-1.jpg","car29-2.jpg","car29-3.jpg","car29-4.jpg","car29-5.jpg"],
  },
  {
    slug: "2015-audi-a4-quattro-sedan",
    files: ["car30.jpg","car30-1.jpg","car30-2.jpg","car30-3.jpg","car30-4.jpg","car30-5.jpg","car30-6.jpg"],
  },
  {
    slug: "2020-toyota-vitz-yaris-hybrid",
    files: ["car31.jpg","car31-1.jpg","car31-2.jpg","car31-3.jpg","car31-4.jpg","car31-5.jpg","car31-6.jpg"],
  },
  {
    slug: "2014-honda-vezel-hrv-hybrid",
    files: ["car32.jpg","car32-1.jpg","car32-2.jpg","car32-3.jpg","car32-4.jpg"],
  },
  {
    slug: "2019-toyota-vitz-yaris-hybrid",
    files: ["car33.jpg","car33-1.jpg","car33-2.jpg","car33-3.jpg"],
  },
];

// ── Types & Helpers ────────────────────────────────────────────────────────

type CloudinaryMap = Record<string, string>; // filename → secure_url

function loadExistingMap(): CloudinaryMap {
  if (fs.existsSync(OUTPUT_MAP)) {
    return JSON.parse(fs.readFileSync(OUTPUT_MAP, "utf-8")) as CloudinaryMap;
  }
  return {};
}

function saveMap(map: CloudinaryMap) {
  fs.writeFileSync(OUTPUT_MAP, JSON.stringify(map, null, 2));
}

async function uploadFile(
  filePath: string,
  filename: string,
  carSlug: string,
  map: CloudinaryMap
): Promise<void> {
  // Skip if already uploaded (idempotent — safe to re-run)
  if (map[filename]) {
    process.stdout.write(`  ⏭  Already uploaded: ${filename}\n`);
    return;
  }

  try {
    // public_id = elite-motor-cars/{car-slug}/{filename-without-ext}
    // This is the KEY to car-image association in Cloudinary's media library
    const nameWithoutExt = path.parse(filename).name;
    const publicId = `${CLOUDINARY_ROOT}/${carSlug}/${nameWithoutExt}`;

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: false,
      resource_type: "image",
      // auto quality + format (Cloudinary serves webp/avif to modern browsers)
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    map[filename] = result.secure_url;
    process.stdout.write(`  ✅  ${filename} → ${result.secure_url}\n`);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    process.stdout.write(`  ❌  Failed: ${filename} — ${msg}\n`);
  }
}

async function uploadCarGroup(
  group: { slug: string; files: string[] },
  map: CloudinaryMap
): Promise<void> {
  console.log(`\n  📁  Car: ${group.slug} (${group.files.length} images)`);

  // Process files in batches of CONCURRENCY within each car
  for (let i = 0; i < group.files.length; i += CONCURRENCY) {
    const batch = group.files.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map((filename) => {
        const filePath = path.join(ASSETS_DIR, filename);
        if (!fs.existsSync(filePath)) {
          process.stdout.write(`  ⚠️  File not found: ${filename}\n`);
          return Promise.resolve();
        }
        return uploadFile(filePath, filename, group.slug, map);
      })
    );
    // Save progress after every batch (allows resuming if interrupted)
    saveMap(map);
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀  Elite Motor Cars — Cloudinary Image Uploader\n");
  console.log(`   Cloud   : ${process.env.CLOUDINARY_CLOUD_NAME}`);
  console.log(`   Folder  : ${CLOUDINARY_ROOT}/{car-slug}/{image}`);
  console.log(`   Output  : ${OUTPUT_MAP}\n`);

  const map = loadExistingMap();
  const alreadyDone = Object.keys(map).length;
  if (alreadyDone > 0) {
    console.log(`   Resuming — ${alreadyDone} already uploaded, skipping those.\n`);
  }

  const totalImages = CAR_GROUPS.reduce((sum, g) => sum + g.files.length, 0);
  console.log(`   Total   : ${CAR_GROUPS.length} cars, ${totalImages} images\n`);
  console.log("─".repeat(60));

  for (const group of CAR_GROUPS) {
    await uploadCarGroup(group, map);
  }

  saveMap(map);

  const uploaded = Object.keys(map).length;
  console.log("\n" + "─".repeat(60));
  console.log(`\n✅  Done! ${uploaded}/${totalImages} images in cloudinary-map.json`);
  console.log("\n   Cloudinary structure:");
  console.log("   elite-motor-cars/");
  console.log("   ├── 2007-mitsubishi-lancer-evolution-x-gsr-ryushon/");
  console.log("   │   ├── car37");
  console.log("   │   ├── car37-1");
  console.log("   │   └── ...");
  console.log("   ├── 2007-lexus-ls600h-v8-5000cc/");
  console.log("   │   ├── car34-1");
  console.log("   │   └── ...");
  console.log("   └── ...\n");
  console.log("   Next step: npm run seed\n");
}

main().catch((err) => {
  console.error("\n❌  Upload failed:", err);
  process.exit(1);
});
