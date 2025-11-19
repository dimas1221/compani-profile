import React from "react";
import clsx from "clsx";

// const baseStyles =
//   "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform";
const baseStyles =
  "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform flex items-center justify-center";

const variantStyles = {
  primary:
    "text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:shadow-lg hover:scale-[1.03] focus:ring-blue-500",
  secondary:
    "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:shadow-md hover:scale-[1.02] focus:ring-gray-400",
  whatsapp:
    "text-white bg-green-600 hover:bg-green-700 hover:shadow-lg hover:scale-[1.03] focus:ring-green-500",

  // Tambahkan varian lain jika diperlukan
};

const sizeStyles = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

export default function GlobalButton({
  type = "button",
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  children,
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled &&
          "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
