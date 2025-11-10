import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nProvider";
import DesignGlobal1 from "../../components/DesignGlobal1";

export default function SuccessStory() {
  const { lang } = useI18n();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    import("../../data/success_story.json")
      .then((res) => setData(res.default[lang]))
      .catch((err) => console.error("Failed to load success_story.json", err));
  }, [lang]);

  if (!data) return null;

  return (
    <DesignGlobal1
      title={data.success_story_title}
      subtitle={data.success_story_subtitle}
      items={data.success_story_items.map((item) => ({
        ...item,
        onClick: () => navigate(`/success-story/${item.id}`), // ✅ click event
      }))}
      useImage={true}
      className="cursor-pointer"
    />
  );
}
