import * as React from "react";

import { cn } from "@/utils/common-functions";

/**
 * @typedef {object} InputFieldProps
 * @property {string} [className]
 * @property {string} [type]
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [props]
 * @property {React.Ref<HTMLInputElement>} [ref]
 *
 * @param {InputFieldProps} props
 * @returns {React.FC<InputFieldProps>}
 */
const InputField = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full rounded-md border-none bg-grayscale-800 px-5 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grayscale-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputField.displayName = "InputField";

export default InputField;
