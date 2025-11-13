// // scripts/generateProductsFlat.js
// import fs from "fs";
// import path from "path";

// const inputPath = "public/data/product.json";
// const outputDir = "public/data/products_flat";

// const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
// fs.mkdirSync(outputDir, { recursive: true });

// const flatProducts = [];

// data.main_categories.forEach((main) => {
//   main.sub_categories.forEach((sub) => {
//     sub.products.forEach((prod) => {
//       const flat = {
//         id: prod.id,
//         name_en: prod.name_en,
//         name_id: prod.name_id,
//         main_category_en: main.name_en,
//         sub_category_en: sub.name_en,
//         image: prod.image || null,
//       };

//       flatProducts.push(flat);
//       fs.writeFileSync(
//         path.join(outputDir, `${prod.id}.json`),
//         JSON.stringify(flat, null, 2)
//       );
//     });
//   });
// });

// console.log(`✅ Generated ${flatProducts.length} flat product files.`);
import fs from "fs";
import path from "path";

// Fungsi untuk generate file JSON per produk flat dari product.json
function generateProductsFlat() {
  const inputPath = path.resolve(process.cwd(), "public/data/product.json");
  const outputDir = path.resolve(process.cwd(), "public/data/products_flat");
  fs.mkdirSync(outputDir, { recursive: true });

  const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const flatProducts = [];

  data.main_categories.forEach((main) => {
    main.sub_categories.forEach((sub) => {
      sub.products.forEach((prod) => {
        const flat = {
          id: prod.id,
          name_en: prod.name_en,
          name_id: prod.name_id,
          main_category_en: main.name_en,
          sub_category_en: sub.name_en,
          image: prod.image || null,
        };

        flatProducts.push(flat);

        fs.writeFileSync(
          path.join(outputDir, `${prod.id}.json`),
          JSON.stringify(flat, null, 2)
        );
      });
    });
  });

  console.log(`✅ Generated ${flatProducts.length} flat product files.`);
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
