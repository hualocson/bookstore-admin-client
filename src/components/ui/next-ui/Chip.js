import { Chip } from "@nextui-org/react";

const CustomChip = ({ size, variant, children }) => {
  return (
    <Chip size={size} variant={variant} color="success">
      {children}
    </Chip>
  );
};

export default CustomChip;
