// MyButton.tsx
import { Button, extendVariants } from "@nextui-org/react";

export const MyButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {
      primary: "text-grayscale-900 bg-primary-300",
      danger: "text-danger-200 bg-danger-500",
    },
    variant: {
      ghost: "bg-transparent border border-primary-500",
    },
    size: {
      xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small",
      md: "px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small",
      xl: "px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium",
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    color: "primary",
    size: "md",
    variant: "solid",
  },
  compoundVariants: [
    // <- modify/add compound variants
    {
      isDisabled: true,
      color: "primary",
      class: "bg-primary-300/80 opacity-100",
    },
    {
      variant: "ghost",
      color: "danger",
      class: "bg-transparent hover:bg-danger-500/20",
    },
  ],
});
