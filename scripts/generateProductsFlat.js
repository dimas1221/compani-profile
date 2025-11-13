import fs from "fs";
import path from "path";

const sourcePath = path.resolve("public/data/product.json");
const outputPath = path.resolve("public/data/products_flat.json");

function flattenProducts(data) {
  const flat = [];

  data.main_categories.forEach((main) => {
    main.sub_categories?.forEach((sub) => {
      sub.products?.forEach((prod) => {
        flat.push({
          id: prod.id,
          name_en: prod.name_en,
          name_id: prod.name_id,
          main_category_id: main.id,
          main_category_en: main.name_en,
          main_category_idn: main.name_id,
          sub_category_id: sub.id,
          sub_category_en: sub.name_en,
          sub_category_idn: sub.name_id,
          image: prod.image || "",
        });
      });
    });
  });

  return flat;
}

function generateFlatFile() {
  try {
    const raw = fs.readFileSync(sourcePath, "utf-8");
    const json = JSON.parse(raw);
    const flat = flattenProducts(json);
    fs.writeFileSync(outputPath, JSON.stringify(flat, null, 2), "utf-8");
    console.log(`✅ Generated ${flat.length} products -> products_flat.json`);
  } catch (err) {
    console.error("❌ Error generating products_flat.json:", err);
  }
}

generateFlatFile();
