import { cn } from "@/utils/common-functions";
import Link from "next/link";
import React from "react";

const Button = React.forwardRef(
  /**
   *
   * @description Button component
   *
   * @param {Object} props
   * @param {boolean} props.disabled
   * @param {React.ReactNode} props.children
   * @param {boolean} props.loading
   * @param {React.ReactNode} props.icon
   * @param {boolean} props.reverseIconSide
   * @param {string} props.customClass
   * @param {"primary" | "secondary" | "danger" | "success" | "grayscale"} props.variant
   * @param {"sm" | "md" | "lg"} props.size
   * @param {string} props.link
   * @param {() => void} props.onClick
   * @param {any[]} props.props
   * @returns {JSX.Element}
   */
  (
    {
      disabled,
      children,
      loading,
      icon,
      reverseIconSide,
      customClass,
      variant,
      size,
      link,
      onClick,
      ...props
    },
    forwardRef
  ) => {
    const className = cn({
      "inline-flex gap-2 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none duration-300 transition-all": true,
      "bg-primary-300 hover:bg-primary-400 text-grayscale-900":
        variant === "primary",
      "bg-transparent text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-grayscale-800":
        variant === "secondary",
      "bg-danger-500 hover:bg-danger-600 text-danger-100": variant === "danger",
      "bg-success-500 hover:bg-success-600 text-success-100":
        variant === "success",
      "bg-grayscale-600 hover:bg-grayscale-700 text-grayscale-100":
        variant === "grayscale",
      "px-5 py-2 text-base gap-3": size === "lg",
      "px-2 py-1 text-xs gap-1": size === "sm",
      "cursor-not-allowed opacity-50": disabled,
      "cursor-not-allowed": loading,
      [customClass]: customClass,
      "flex-row-reverse": reverseIconSide,
    });

    const loadingIconWithVariant = cn({
      "animate-spin h-5 w-5 text-white": true,
      "text-grayscale-800": variant === "primary",
      "text-primary-500": variant === "secondary",
      "text-danger-100": variant === "danger",
      "text-success-100": variant === "success",
      "text-grayscale-100": variant === "grayscale",
      "h-3 w-3": size === "sm",
      "h-6 w-6": size === "lg",
    });

    return link ? (
      <Link href={link} className={className} {...props} ref={forwardRef}>
        {loading ? (
          <svg
            className={loadingIconWithVariant}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          icon
        )}
        {children}
      </Link>
    ) : (
      <button
        ref={forwardRef}
        className={className}
        onClick={onClick}
        {...props}
        disabled={disabled || loading}
      >
        {loading ? (
          <svg
            className={loadingIconWithVariant}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          icon
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
