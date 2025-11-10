import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/contoh_response_api.json";
import { useI18n } from "../../i18n/I18nProvider";
import { Wifi, Bluetooth, Rss, Cpu, ArrowLeft } from "lucide-react";
import GlobalButton from "../../components/GlobalButton";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t.product_not_found}
        </p>
        <GlobalButton
          onClick={() => navigate("/")}
          size="medium"
          variant="primary"
        >
          ← {t.back_to_home}
        </GlobalButton>
      </div>
    );
  }

  const name = lang === "en" ? product.name_en : product.name_id;
  const short = lang === "en" ? product.desc_en : product.desc_id;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* 🔹 Product Image */}
        <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
          <img
            src={product.image}
            alt={name}
            className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.compatibility && (
            <div className="absolute bottom-4 left-4 flex gap-3 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-lg px-3 py-2 shadow">
              {product.compatibility.includes("wifi") && (
                <Wifi className="w-5 h-5 text-blue-500" />
              )}
              {product.compatibility.includes("bluetooth") && (
                <Bluetooth className="w-5 h-5 text-sky-500" />
              )}
              {product.compatibility.includes("mqtt") && (
                <Rss size={16} className="text-amber-500" />
              )}
            </div>
          )}
        </div>

        {/* 🔹 Product Details */}
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
            {name}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {short}
          </p>

          {/* 🔹 Features */}
          {product.features && (
            <>
              <h3 className="mt-8 text-xl font-semibold text-gray-800 dark:text-gray-200">
                {t.features}
              </h3>
              <ul className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/60 px-3 py-2 rounded-lg shadow-sm"
                  >
                    <Cpu className="w-4 h-4 text-primary-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* 🔹 Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <GlobalButton
              variant="primary"
              size="large"
              onClick={() => alert("Contacting sales...")}
            >
              {t.contact_sales}
            </GlobalButton>

            <GlobalButton
              variant="secondary"
              size="large"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> {t.back_to_home}
            </GlobalButton>
          </div>
        </div>
      </div>
    </div>
  );
}
