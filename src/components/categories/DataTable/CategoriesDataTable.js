import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/ui/DataTable";

export function CategoriesDataTable({ columns, data, onSelectCategory }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateTable: onSelectCategory,
    },
  });

  return (
    <div className="rounded-lg">
      <DataTable table={table} colLength={columns.length} />
    </div>
  );
}
