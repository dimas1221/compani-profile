import fs from "fs";
import path from "path";

export function generateProductsFlat() {
  const inputPath = path.resolve(process.cwd(), "public/data/product.json");
  const outputDir = path.resolve(process.cwd(), "public/data/products_flat");

  // Pastikan folder ada
  fs.mkdirSync(outputDir, { recursive: true });

  // Load data JSON utama
  const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

  let count = 0;

  data.main_categories.forEach((main) => {
    main.sub_categories.forEach((sub) => {
      sub.products.forEach((prod) => {
        const flat = {
          id: prod.id,
          name_en: prod.name_en,
          name_id: prod.name_id,
          short_en: prod.short_en,
          short_id: prod.short_id,
          desc_en: prod.desc_en,
          desc_id: prod.desc_id,

          main_category_id: main.id,
          main_category_en: main.name_en,
          main_category_id_name: main.name_id,

          sub_category_id: sub.id,
          sub_category_en: sub.name_en,
          sub_category_id_name: sub.name_id,

          image: prod.image || null,

          // === FIX: compatibility ikut dipindahkan ===
          compatibility: Array.isArray(prod.compatibility)
            ? prod.compatibility
            : [],
        };

        // Tulis file per-product
        fs.writeFileSync(
          path.join(outputDir, `${prod.id}.json`),
          JSON.stringify(flat, null, 2)
        );

        count++;
      });
    });
  });

  console.log(`✅ Generated ${count} flat files with compatibility.`);
}

// Fungsi untuk generate index.json dari semua JSON di folder kecuali index.json
function generateIndex(folder) {
  const folderPath = path.resolve(process.cwd(), folder);
  const outputPath = path.join(folderPath, "index.json");

  if (!fs.existsSync(folderPath)) {
    console.warn(
      `⚠️ Folder ${folderPath} tidak ditemukan, skip generate index.json`
    );
    return;
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.endsWith(".json") && f !== "index.json");

  const data = files
    .map((file) => {
      try {
        const content = fs.readFileSync(path.join(folderPath, file), "utf8");
        return JSON.parse(content);
      } catch (e) {
        console.error(`Error parsing ${file} in ${folder}:`, e.message);
        return null;
      }
    })
    .filter(Boolean);

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`✅ Generated ${outputPath} with ${data.length} entries.`);
}

async function main() {
  // Step 1: Generate produk flat
  generateProductsFlat();

  // Step 2: Generate index.json untuk products_flat
  generateIndex("public/data/products_flat");

  // Step 3: Generate index.json untuk detail_product
  generateIndex("public/data/detail_product");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
