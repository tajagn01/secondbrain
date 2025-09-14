import React from "react";

const variantClasses = {
  primary: "bg-purple-600 hover:bg-purple-700 text-white",
  secondary: "bg-purple-100 hover:bg-purple-200 text-purple-700",
};

const sizeMap = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  variant = "primary",
  text,
  StartIcon,
  className = "",
  type = "button",
  onClick,
  size = "md",
  fullWidth = false,
  loading = false,
  ...otherProps
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60 disabled:cursor-not-allowed select-none";
  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeMap[size] || sizeMap.md;
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
      disabled={loading || otherProps.disabled}
      {...otherProps}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
      ) : (
        StartIcon && <span className="flex-shrink-0">{StartIcon}</span>
      )}
      <span>{text}</span>
    </button>
  );
}