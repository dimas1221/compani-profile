// scripts/generateProductsFlat.js
import fs from "fs";
import path from "path";

const inputPath = "public/data/product.json";
const outputDir = "public/data/products_flat";

const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
fs.mkdirSync(outputDir, { recursive: true });

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
