import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Users,
  Coins,
  Megaphone,
  Cpu,
  LineChart,
  Layers,
  Rocket,
} from "lucide-react";
import { useI18n } from "../../i18n/I18nProvider";
import DesignGlobal1 from "../../components/DesignGlobal1";

export default function Principle() {
  const { lang } = useI18n();
  const [data, setData] = useState(null);

  useEffect(() => {
    import("../../data/principle.json")
      .then((res) => setData(res.default[lang]))
      .catch((err) => console.error("Failed to load principle.json", err));
  }, [lang]);

  if (!data) return null;

  const icons = [
    <ShieldCheck />,
    <Users />,
    <Coins />,
    <Megaphone />,
    <Cpu />,
    <LineChart />,
    <Layers />,
    <Rocket />,
  ];

  // Gabungkan icon ke tiap item
  const itemsWithIcons = data.principle_items.map((item, i) => ({
    ...item,
    icon: icons[i],
  }));

  return (
    <DesignGlobal1
      title={data.principle_title}
      subtitle={data.principle_subtitle}
      items={itemsWithIcons}
      useIcon
    />
  );
}
