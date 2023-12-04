import { priceFormatter } from "@/utils/common-functions";
import { ProductStatus } from "@/utils/constants";

import { Chip } from "@nextui-org/react";
import Image from "next/image";

export const columns = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ getValue, row }) => {
      const imageUrl = getValue();
      return (
        <Image
          src={imageUrl}
          width={60}
          height={120}
          className="object-contain h-auto rounded shadow-lg"
          priority
          alt={`category-image-${row.original.id}`}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => {
      return <div className="max-w-xs line-clamp-2">{getValue()}</div>;
    },
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      switch (getValue()) {
        case ProductStatus.IN_STOCK:
          return (
            <Chip size="md" variant={"flat"} color="success">
              {"In Stock"}
            </Chip>
          );
        case ProductStatus.OUT_OF_STOCK:
          return (
            <Chip size="md" variant={"flat"} color="danger">
              {"Out of Stock"}
            </Chip>
          );
        case ProductStatus.ON_SALE:
          return (
            <Chip size="md" variant={"flat"} color="success">
              {"On Sale"}
            </Chip>
          );
        case ProductStatus.NEW_ARRIVAL:
          return (
            <Chip size="md" variant={"flat"} color="success">
              {"New Arrival"}
            </Chip>
          );
        case ProductStatus.BEST_SELLER:
          return (
            <Chip size="md" variant={"flat"} color="success">
              {"Best Seller"}
            </Chip>
          );
        default:
          return (
            <Chip size="md" variant={"flat"} color="success">
              {"In Stock"}
            </Chip>
          );
      }
    },
  },
  {
    accessorKey: "totalSold",
    header: "Sold",
  },
  {
    accessorKey: "totalSales",
    header: "Total Sales",
    cell: ({ getValue }) => {
      const totalSales = getValue();
      return <span className="text-right">{priceFormatter(totalSales)}</span>;
    },
  },
];
