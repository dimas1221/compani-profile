import React from "react";
import clsx from "clsx";

const baseStyles =
  "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

const variantStyles = {
  primary:
    "text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 focus:ring-blue-500",
  secondary: "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400",
  // Bisa tambah variant lain di sini
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
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
