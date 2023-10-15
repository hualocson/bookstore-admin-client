import Button from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "parentId",
    header: "Parent",
    cell: ({ row }) => {
      const value = row.getValue("parentId");
      return value ? value : <span className="text-danger-500">N/A</span>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const value = row.getValue("description");
      return value ? (
        <span className="text-primary-300">{`"${value}"`}</span>
      ) : (
        <span className="text-danger-500">N/A</span>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image");
      return (
        <span>
          <Image
            src={imageUrl}
            width={50}
            height={50}
            alt={`category-image-${row.getValue("id")}`}
          />
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="grayscale"
              customClass="h-8 w-8 p-0 bg-transparent hover:bg-grayscale-100/10"
              icon={<EllipsisHorizontalIcon className="h-4 w-4" />}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Inactive</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const category = row.original;
                table.options.meta.updateTable(category);
              }}
            >
              Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
