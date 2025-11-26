import React from 'react';

export default function TeamCard({ member, lang }) {
  return (
    <div className="flex gap-4 items-start bg-transparent">
      <img
        src={member.image}
        alt={member.name}
        className="w-16 h-16 object-cover rounded-full ring-2 ring-white/60 dark:ring-gray-800/60"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {member.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {member.role || ''}
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {lang === 'id' ? member.message_id : member.message_en}
        </p>
      </div>
    </div>
  );
}
