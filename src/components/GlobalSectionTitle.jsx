export default function GlobalSectionTitle({
  title,
  subtitle,
  className = "",
}) {
  return (
    <div
      className={`mb-6 text-center max-w-3xl mx-auto px-4 sm:px-0 ${className}`}
    >
      <h2
        className="
          text-2xl sm:text-4xl font-extrabold
          bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400
          text-transparent bg-clip-text
          dark:from-cyan-400 dark:via-sky-400 dark:to-blue-600
          leading-tight
        "
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 sm:mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-lg leading-snug sm:leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
