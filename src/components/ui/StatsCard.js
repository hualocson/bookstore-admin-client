import { cn, priceFormatter } from "@/utils/common-functions";
import React from "react";

/**
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {number} props.value
 * @param {"number" | "currency"} [props.format]
 * @param {string} [props.customContainerClass]
 * @param {React.ComponentType<{ className?: string }>} [props.icon]
 * @returns
 */
const StatsCard = ({
  label,
  value,
  format = "number",
  customContainerClass,
  customLabelClass,
  icon,
}) => {
  const getFormattedValue = () => {
    switch (format) {
      case "number":
        return value.toLocaleString();
      case "currency":
        return priceFormatter(value);
      default:
        return value;
    }
  };

  return (
    <div
      className={cn(
        "flex justify-between items-center gap-4 min-w-[200px] p-6 rounded-lg bg-grayscale-900 shadow-lg",
        customContainerClass
      )}
    >
      <div className="flex flex-col gap-4 ">
        <span className="text-5xl font-bold">{getFormattedValue()}</span>
        <span className={cn("text-lg text-grayscale-300", customLabelClass)}>
          {label}
        </span>
      </div>
      {icon && icon}
    </div>
  );
};

export default StatsCard;
