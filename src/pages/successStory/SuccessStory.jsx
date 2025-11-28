import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';
import DesignGlobal1 from '../../components/DesignGlobal1';

export default function SuccessStory() {
  const { lang } = useI18n();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/success_story.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to load success_story.json', err));
  }, []);

  if (!data) return null;

  const title = lang === 'id' ? data.title_id : data.title_en;
  const subtitle = lang === 'id' ? data.subtitle_id : data.subtitle_en;

  // convert items → sesuai props DesignGlobal1
  const items = data.items.map((item) => ({
    title: lang === 'id' ? item.title_id : item.title_en,
    subtitle: lang === 'id' ? item.subtitle_id : item.subtitle_en,
    date: item.date,
    image: item.image,
    onClick: () => navigate(`/success-story/${item.id}`),
  }));

  return (
    <DesignGlobal1
      title={title}
      subtitle={subtitle}
      items={items}
      useImage={true}
      className="cursor-pointer"
    />
  );
}
