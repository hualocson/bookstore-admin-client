import { ProductStatus } from "@/utils/constants";

import { priceFormatter } from "@/utils/common-functions";
import {
  TrashIcon as DeleteIcon,
  PencilSquareIcon as EditIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  ArrowUturnLeftIcon as RestoreIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ getValue }) => {
      return <span>{`P#${getValue()}`}</span>;
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
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => {
      const price = getValue();
      return <span>{priceFormatter(price)}</span>;
    },
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, getValue }) => {
      const status = getValue();
      const { statusName } = row.original;
      switch (status) {
        case ProductStatus.IN_STOCK:
          return (
            <Chip
              size="md"
              variant={"flat"}
              className="text-semi-grayscale-300 bg-semi-grayscale-300/30"
            >
              {statusName}
            </Chip>
          );
        case ProductStatus.OUT_OF_STOCK:
          return (
            <Chip size="md" variant={"flat"} color="danger">
              {statusName}
            </Chip>
          );
        case ProductStatus.ON_SALE:
          return (
            <Chip
              size="md"
              variant={"flat"}
              className="text-success-300 bg-success-400/30"
            >
              {statusName}
            </Chip>
          );
        case ProductStatus.NEW_ARRIVAL:
          return (
            <Chip size="md" variant={"flat"} color="warning">
              {statusName}
            </Chip>
          );
        case ProductStatus.BEST_SELLER:
          return (
            <Chip size="md" variant={"flat"} color="secondary">
              {statusName}
            </Chip>
          );
        default:
          return <Chip>{statusName}</Chip>;
      }
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const iconClass =
        "h-4 w-4 text-xl text-grayscale-200 pointer-events-none flex-shrink-0";
      const items = [
        {
          key: "update",
          label: "Update",
          icon: <EditIcon className={iconClass} strokeWidth={1.5} />,
          status: row.original.deletedAt ? "hidden" : "default",
        },
        {
          key: "restore",
          label: "Restore",
          icon: <RestoreIcon className={iconClass} strokeWidth={1.5} />,
          status: row.original.deletedAt ? "default" : "hidden",
        },
        {
          key: "delete",
          label: "Delete",
          icon: <DeleteIcon className={iconClass} strokeWidth={1.5} />,
          status: row.original.deletedAt ? "hidden" : "default",
        },
      ];

      const handleOnPress = (key) => {
        switch (key) {
          case "update":
            table.options.meta.onSelectRow(row.original);
            break;
          case "restore":
            table.options.meta.onRestore(row.original.id);
            break;
          case "delete":
            table.options.meta.onDelete(row.original.id);
            break;
          default:
            break;
        }
      };

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" color="primary" isIconOnly size="sm">
              <EllipsisHorizontalIcon className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            items={items}
            onAction={(key) => handleOnPress(key)}
          >
            {(item) =>
              item.status !== "hidden" && (
                <DropdownItem
                  key={item.key}
                  color={item.key === "delete" ? "danger" : "default"}
                  className={item.key === "delete" ? "text-danger" : ""}
                  startContent={item.icon}
                >
                  {item.label}
                </DropdownItem>
              )
            }
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];
