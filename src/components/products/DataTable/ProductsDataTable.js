import { columns } from "@/components/products/DataTable/columns";
import DataTable from "@/components/ui/DataTable";
import ConfirmModal from "@/components/ui/next-ui/ConfirmModal";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
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
    meta: {
      onSelectRow,
      onDelete: handleOnDelete,
      onRestore,
    },
  });
  return (
    <>
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
