import {
  getLastCharacters,
  hashText,
  priceFormatter,
} from "@/utils/common-functions";
import { OrderStatus } from "@/utils/constants";
import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";
import DataTableRowActions from "./DataTableRowActions";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ getValue }) => {
      const id = getValue();
      return <span>{getLastCharacters(hashText(String(id)))}</span>;
    },
    filterFn: (row, id, value) => {
      const hashedId = hashText(String(row.getValue(id)));
      return hashedId.includes(value);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => {
      const createdAt = getValue();
      return <span>{dayjs(createdAt).format("MMMM D, YYYY h:mm A")}</span>;
    },
  },
  {
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const { firstName, lastName, email } = row.original;
      return (
        <div className="flex flex-col gap-2">
          <span>{`${firstName} ${lastName}`}</span>
          <span className="text-grayscale-400">{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => {
      const price = getValue();
      return <span>{priceFormatter(price)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      switch (status) {
        case OrderStatus.PENDING:
          return (
            <Chip size="md" variant={"flat"} color="primary">
              {"Pending"}
            </Chip>
          );
        case OrderStatus.PROCESSED:
          return (
            <Chip
              size="md"
              variant={"flat"}
              className="bg-blue-400/20 text-blue-300"
            >
              {"Delivering"}
            </Chip>
          );
        case OrderStatus.DELIVERED:
          return (
            <Chip className="bg-success-400/40 text-success-300">
              {"Delivered"}
            </Chip>
          );
        case OrderStatus.CANCELLED:
          return (
            <Chip size="md" variant={"flat"} color="danger">
              {"Cancelled"}
            </Chip>
          );
        default:
          return null;
      }
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
