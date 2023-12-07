import React, { useState } from "react";
import { columns } from "./columns";
import DataTable from "@/components/ui/DataTable";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DataTableToolbar from "./DataTableToolbar";

const OrdersDataTable = ({ data, onOpenModal, onCancel }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      openModal: onOpenModal,
      onCancel,
    },
  });
  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <DataTable table={table} colLength={columns.length} />
    </div>
  );
};

export default OrdersDataTable;
