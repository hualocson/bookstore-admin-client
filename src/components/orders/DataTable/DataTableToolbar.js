import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import { OrderStatus } from "@/utils/constants";
export const statuses = [
  {
    value: OrderStatus.PENDING,
    label: "Pending",
  },
  {
    value: OrderStatus.PROCESSED,
    label: "Processed",
  },
  {
    value: OrderStatus.DELIVERED,
    label: "Delivered",
  },
  {
    value: OrderStatus.CANCELLED,
    label: "Cancelled",
  },
];

const DataTableToolbar = ({ table }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search ..."
          value={table.getColumn("id")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          startContent={<Search className="h-4 w-4" />}
          className="w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
      </div>
    </div>
  );
};

export default DataTableToolbar;
