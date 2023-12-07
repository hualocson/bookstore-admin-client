import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import { ProductStatus } from "@/utils/constants";

export const statuses = [
  {
    value: ProductStatus.NEW_ARRIVAL,
    label: "New",
  },
  {
    value: ProductStatus.BEST_SELLER,
    label: "Best Seller",
  },
  {
    value: ProductStatus.IN_STOCK,
    label: "In Stock",
  },
  {
    value: ProductStatus.OUT_OF_STOCK,
    label: "Out of Stock",
  },
  {
    value: ProductStatus.ON_SALE,
    label: "On Sale",
  },
];
const DataTableToolbar = ({ table }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search ..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
