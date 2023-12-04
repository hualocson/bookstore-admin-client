import { Input } from "@nextui-org/react";
import React from "react";

const ProductInput = ({
  label,
  isInvalid,
  errorMessage,
  field,
  onValueChange,
}) => {
  return (
    <Input
      label={label}
      labelPlacement="inside"
      variant="faded"
      classNames={{
        inputWrapper: [
          "group-data-[focus=true]:border-primary",
          "group-data-[focus-visible=true]:ring-0",
          "group-data-[focus-visible=true]:ring-offset-0",
        ],
      }}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      autoComplete="off"
      isRequired
      onValueChange={onValueChange}
      {...field}
    />
  );
};

export default ProductInput;
