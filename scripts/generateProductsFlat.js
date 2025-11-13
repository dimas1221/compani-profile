import fs from "fs";
import path from "path";

const productSource = path.resolve("public/data/product.json");
const outputFolder = path.resolve("public/data/products_flat");

// Pastikan folder output ada
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Hapus semua file lama di folder
fs.readdirSync(outputFolder).forEach((file) => {
  fs.unlinkSync(path.join(outputFolder, file));
});

const rawData = fs.readFileSync(productSource, "utf8");
const data = JSON.parse(rawData);

let flatProducts = [];

data.main_categories.forEach((main) => {
  main.sub_categories.forEach((sub) => {
    sub.products.forEach((prod) => {
      flatProducts.push({
        id: prod.id,
        name_en: prod.name_en,
        name_id: prod.name_id,
        main_category_en: main.name_en,
        sub_category_en: sub.name_en,
        image: prod.image,
      });
    });
  });
});

// Simpan setiap produk ke file terpisah
flatProducts.forEach((prod) => {
  const filePath = path.join(outputFolder, `${prod.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(prod, null, 2));
});

console.log(
  `✅ Generated ${flatProducts.length} product files in products_flat folder`
);
