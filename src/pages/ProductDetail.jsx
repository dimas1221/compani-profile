import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/contoh_response_api.json";

export default function ProductDetail({ lang }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 Auto scroll ke atas saat halaman ini dibuka
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Product not found
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  const name = lang === "en" ? product.name_en : product.name_id;
  const short = lang === "en" ? product.short_en : product.short_id;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <img
            src={product.image}
            alt={name}
            className="w-full h-96 object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{name}</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{short}</p>
          <div className="mt-6 text-xl font-semibold text-primary-600">
            {product.price ? `$${product.price}` : "Contact us"}
          </div>

          {/* 🔹 Tombol Kembali */}
          <button
            onClick={() => navigate("/")}
            className="mt-8 px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
