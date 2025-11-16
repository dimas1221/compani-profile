import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsFlat from "../../../public/data/products_flat/index.json";
import detailProducts from "../../../public/data/detail_product/index.json";
import { useI18n } from "../../i18n/I18nProvider";
import GlobalButton from "../../components/GlobalButton";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalCard3d from "../../components/GlobalCard3d";
import FeatureItem from "../../components/FeatureItem";
import { Wifi, Bluetooth, Rss } from "lucide-react";
import TemplateSection from "../../components/TemplateSection";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const translate = (key) => t[key] || key;

  const product = productsFlat.find((p) => p.id === id);
  const detail = detailProducts.find((d) => d.product_id === id);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const icons = {
    wifi: <Wifi size={18} className="text-blue-500" />,
    bluetooth: <Bluetooth size={18} className="text-indigo-500" />,
    mqtt: <Rss size={18} className="text-amber-500" />,
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 text-center text-gray-500">
        {translate("Product not found")}
        <br />
        <GlobalButton onClick={() => navigate(-1)} className="mt-4">
          ← {translate("Back")}
        </GlobalButton>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 text-center text-gray-500">
        {translate("Product detail not found")}
        <br />
        <GlobalButton onClick={() => navigate(-1)} className="mt-4">
          ← {translate("Back")}
        </GlobalButton>
      </div>
    );
  }

  const name = lang === "id" ? product.name_id : product.name_en;
  const introduction =
    lang === "id" ? detail.introduction_id : detail.introduction_en;
  const features = lang === "id" ? detail.features_id : detail.features_en;
  const parameters = lang === "id" ? detail.parameter_id : detail.parameter_en;

  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Pellentesque imperdiet ligula quis massa dictum...`.repeat(7);

  return (
    <TemplateSection>
      <div className="max-w-7xl mx-auto relative z-10">
        <GlobalButton onClick={() => navigate(-1)} className="mt-4">
          ← {translate("Back")}
        </GlobalButton>

        {/* === Title Section === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold
              bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400
              text-transparent bg-clip-text dark:from-cyan-400 dark:via-sky-400 dark:to-blue-600"
          ></h2>
        </motion.div>

        {/* === Main Content === */}
        <motion.div
          className="flex flex-col md:flex-row gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* LEFT IMAGE CARD */}
          <GlobalCard3d
            className="
              relative 
              w-[14rem] h-[20rem] 
              sm:w-[18rem] sm:h-[24rem] 
              md:w-[22rem] md:h-[30rem] 
              rounded-3xl overflow-hidden 
              shadow-[0_25px_60px_rgba(0,0,0,0.45)]
              bg-neutral-900 border border-white/5
            "
          >
            <img
              src={product.image}
              alt={name}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Glass Overlay */}
            <div
              className="
                absolute inset-0 
                bg-gradient-to-b 
                from-black/5 via-black/10 to-black/65
                backdrop-blur-[1px]
              "
            />

            {/* ICON BADGE */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
              {product.compatibility?.map((c) => (
                <div
                  key={c}
                  className="
                    flex items-center gap-1.5 px-3 py-1.5 
                    rounded-full bg-white/15 border border-white/25
                    backdrop-blur-md text-white text-xs font-medium
                    shadow-[0_0_12px_rgba(0,0,0,0.5)]
                  "
                >
                  {icons[c]}
                  <span className="capitalize">{c}</span>
                </div>
              ))}
            </div>
          </GlobalCard3d>

          {/* RIGHT CONTENT */}
          <div className="flex-grow max-w-2xl flex flex-col">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
              {name}
            </h1>

            <section className="mb-10 text-gray-700 dark:text-gray-300 leading-relaxed text-justify text-base sm:text-lg tracking-wide">
              {introduction || translate("No introduction available.")}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-700 pb-3">
                {translate("Features")}
              </h2>

              {features?.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feat, idx) => (
                    <FeatureItem key={idx} text={feat.feature || feat} />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  {translate("No features listed.")}
                </p>
              )}
            </section>

            <div className="mt-auto pt-12">
              <GlobalButton
                onClick={() => setSidebarOpen(true)}
                className="text-lg font-semibold py-3 px-8 shadow-lg hover:shadow-xl transition"
              >
                {translate("Show Parameters")}
              </GlobalButton>
            </div>
          </div>
        </motion.div>
      </div>

      {/* === SIDEBAR === */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full bg-white dark:bg-neutral-900 shadow-2xl z-50 w-full md:w-96 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {translate("Parameters")}
              </h3>

              <button
                onClick={() => setSidebarOpen(false)}
                aria-label={translate("Close Parameters")}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow max-h-[calc(100vh-64px)] space-y-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {lorem}
              </p>

              {parameters?.length > 0 ? (
                <table className="w-full table-auto border-collapse text-gray-800 dark:text-gray-300 rounded-lg overflow-hidden shadow-md">
                  <tbody>
                    {parameters.map(({ label, value }, idx) => (
                      <tr
                        key={idx}
                        className="border-b last:border-b-0 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                      >
                        <td className="py-3 px-5 font-semibold w-1/3 bg-gray-100 dark:bg-neutral-800">
                          {label}
                        </td>
                        <td className="py-3 px-5 bg-white dark:bg-neutral-900 break-words">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="italic text-gray-500">
                  {translate("No parameters available.")}
                </p>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </TemplateSection>
  );
}
