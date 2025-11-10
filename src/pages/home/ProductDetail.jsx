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
  const desc = lang === "en" ? product.desc_en : product.desc_id;

  return (
    <section
      className="
        min-h-screen py-16 sm:py-24 px-6
        transition-colors duration-700
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start font-[Inter]">
        {/* === Left: Product Image === */}
        <div className="relative group rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
          <img
            src={product.image}
            alt={name}
            className="w-full h-[400px] sm:h-[480px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Compatibility Badges */}
          {product.compatibility && (
            <div
              className="absolute bottom-4 left-4 flex gap-3 
              bg-white/90 dark:bg-gray-900/80 backdrop-blur-md 
              rounded-xl px-3 py-2 shadow-lg border border-gray-100/50 dark:border-gray-700/40"
            >
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

        {/* === Right: Product Details === */}
        <div className="space-y-6 sm:space-y-8">
          {/* Product Title */}
          <div>
            <h1
              className="
                text-3xl sm:text-4xl font-extrabold 
                text-gray-900 dark:text-white tracking-tight
                bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent
                dark:from-cyan-400 dark:to-sky-500
              "
            >
              {name}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {desc}
            </p>
          </div>

          {/* Features */}
          {product.features && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {t.features}
              </h3>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    className="
                      flex items-start gap-3 p-3 rounded-xl
                      bg-white/70 dark:bg-gray-800/70
                      border border-gray-200 dark:border-gray-700
                      shadow-sm hover:shadow-md transition-all duration-300
                    "
                  >
                    <Cpu className="w-5 h-5 text-blue-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-4 flex flex-wrap gap-4">
            <GlobalButton
              variant="primary"
              size="large"
              onClick={() => alert("Contacting sales...")}
              className="min-w-[160px] sm:min-w-[180px]"
            >
              {t.contact_sales}
            </GlobalButton>

            <GlobalButton
              variant="secondary"
              size="large"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 min-w-[160px] sm:min-w-[180px]"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.back_to_home}
            </GlobalButton>
          </div>
        </div>
      </div>

      {/* Decorative background */}
      <img
        src="/images/logo/ultra_light 1.png"
        alt="decor"
        className="absolute right-0 bottom-0 w-[400px] opacity-10 dark:opacity-20 pointer-events-none select-none"
      />
    </section>
  );
}
