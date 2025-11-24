import React from 'react';
export default function TeamCard({ member, lang }) {
  return (
    <div className="flex gap-4 items-start bg-white dark:bg-[#0f1116] p-4 rounded-lg border border-gray-100 dark:border-gray-800">
      <img
        src={member.image}
        alt={member.name}
        className="w-14 h-14 object-cover rounded-full"
      />
      <div>
        <div className="font-semibold text-gray-900 dark:text-gray-100">
          {member.name}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {lang === 'id' ? member.message_id : member.message_en}
        </p>
      </div>
    </div>
  );
}
