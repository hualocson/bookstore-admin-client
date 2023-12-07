import { columns } from "@/components/products/DataTable/columns";
import DataTable from "@/components/ui/DataTable";
import ConfirmModal from "@/components/ui/next-ui/ConfirmModal";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import DataTableToolbar from "./DataTableToolbar";
const ProductDataTable = ({ data, onSelectRow, onDelete, onRestore }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleOnDelete = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      onSelectRow,
      onDelete: handleOnDelete,
      onRestore,
    },
  });
  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} colLength={columns.length} />

      <ConfirmModal
        isOpenProps={isOpen}
        onOpenProps={onOpen}
        onCloseProps={onClose}
        title={"Are you sure you want to delete product?"}
        content={"This action can make your data lost forever."}
        onConfirm={() => onDelete(selectedId)}
      />
    </>
  );
};

export default ProductDataTable;
