import CustomChip from "@/components/ui/next-ui/Chip";
import { ProductStatus } from "@/utils/constants";

import { MyButton as Button } from "@/components/ui/next-ui/MyButton";
import {
  TrashIcon as DeleteIcon,
  PencilSquareIcon as EditIcon,
  EllipsisHorizontalIcon,
  ArrowUturnLeftIcon as RestoreIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import {
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
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
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
          width={80}
          height={50}
          className="object-contain h-auto"
          priority
          alt={`category-image-${row.getValue("id")}`}
        />
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "statusName",
    header: "Status",
    cell: ({ row, getValue }) => {
      const statusName = getValue();
      const { status } = row.original;
      switch (status) {
        case ProductStatus.IN_STOCK:
          return (
            <CustomChip size="md" variant={"solid"}>
              {statusName}
            </CustomChip>
          );
        case ProductStatus.OUT_OF_STOCK:
          return <span className="text-red-500">{statusName}</span>;
        case ProductStatus.ON_SALE:
          return <span className="text-blue-500">{statusName}</span>;
        case ProductStatus.NEW_ARRIVAL:
          return <span className="text-yellow-500">{statusName}</span>;
        case ProductStatus.BEST_SELLER:
          return <span className="text-purple-500">{statusName}</span>;
        default:
          return <span>{statusName}</span>;
      }
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
          key: "more",
          label: "View detail",
          icon: (
            <EyeIcon className={iconClass} strokeWidth={1.5} />
          ),
          status: "default",
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
            <Button variant="flat" isIconOnly size="xs">
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
