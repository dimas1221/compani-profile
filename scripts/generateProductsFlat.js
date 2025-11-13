// scripts/generateProductsFlat.js
import fs from "fs";
import path from "path";

const productPath = path.resolve("public/data/product.json");
const outputPath = path.resolve("public/data/products_flat.json");

try {
  const data = JSON.parse(fs.readFileSync(productPath, "utf-8"));

  const flatProducts = [];

  data.main_categories.forEach((mainCat) => {
    const mainCatNameEn = mainCat.name_en;
    const subCategories = mainCat.sub_categories || [];

    subCategories.forEach((subCat) => {
      const subCatNameEn = subCat.name_en;
      const products = subCat.products || [];

      products.forEach((product) => {
        flatProducts.push({
          id: product.id,
          name_en: product.name_en,
          name_id: product.name_id,
          main_category_en: mainCatNameEn,
          sub_category_en: subCatNameEn,
          image: product.image || "",
        });
      });
    });
  });

  fs.writeFileSync(outputPath, JSON.stringify(flatProducts, null, 2));
  console.log("✅ products_flat.json generated successfully!");
} catch (error) {
  console.error("❌ Failed to generate products_flat.json:", error);
}
