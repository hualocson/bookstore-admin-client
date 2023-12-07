import { OrderStatus } from "@/utils/constants";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { DeleteIcon, EyeIcon } from "lucide-react";

const DataTableRowActions = ({ row, table }) => {
  const iconClass =
    "h-4 w-4 text-xl text-grayscale-200 pointer-events-none flex-shrink-0";
  const items = [
    {
      key: "more",
      color: "default",
      label: "View detail",
      status: "default",
      icon: <EyeIcon className={iconClass} strokeWidth={1.5} />,
    },
    {
      key: "cancel",
      color: "danger",
      label: "Cancel",
      status:
        row.original.status === OrderStatus.DELIVERED ? "hidden" : "default",
      icon: <DeleteIcon className={iconClass} strokeWidth={1.5} />,
    },
  ];
  const handleOnPress = (key) => {
    switch (key) {
      case "cancel":
        table.options.meta.onCancel(row.original);
        break;
      case "more":
        table.options.meta.openModal(row.original);
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
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.color}
            startContent={item.icon}
            className={item.status === "hidden" && "hidden"}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DataTableRowActions;
