import * as React from "react";
import { Label } from "@/components/ui/Label";

import { cn } from "@/utils/common-functions";
import InputField from "./InputField";

const InputWithLabel = React.forwardRef(
  ({ className, inputClassName, id, type, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid w-full items-center gap-1.5", className)}
      >
        <Label htmlFor={id}>{label}</Label>
        <InputField type={type} id={id} className={inputClassName} {...props} />
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
