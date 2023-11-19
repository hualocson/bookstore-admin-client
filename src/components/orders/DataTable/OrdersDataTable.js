import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/ui/DataTable";

const OrdersDataTable = ({ data, onOpenModal }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      meta={{
        openModal: onOpenModal,
      }}
    />
  );
};

export default OrdersDataTable;
