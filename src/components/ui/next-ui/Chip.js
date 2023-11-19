import { Chip } from "@nextui-org/react";

const CustomChip = ({ size, variant, children, color = "success" }) => {
  return (
    <Chip size={size} variant={variant} color={color}>
      {children}
    </Chip>
  );
};

export default CustomChip;
