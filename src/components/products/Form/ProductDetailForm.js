import DatePicker from "@/components/ui/DatePicker";
import { ProductStatus } from "@/utils/constants";
import { Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import ProductInput from "./ProductInput";

const ProductDetailForm = ({ initData, control, errors }) => {
  const productStatus = [
    {
      id: ProductStatus.IN_STOCK,
      name: "In Stock",
    },
    {
      id: ProductStatus.BEST_SELLER,
      name: "Best Seller",
    },
    {
      id: ProductStatus.NEW_ARRIVAL,
      name: "New",
    },
    {
      id: ProductStatus.ON_SALE,
      name: "On Sale",
    },
    {
      id: ProductStatus.OUT_OF_STOCK,
      name: "Out of Stock",
    },
  ];

  return (
    <div className="grid gap-x-2 gap-y-4 grid-cols-2 auto-rows-min">
      <Controller
        control={control}
        name="author"
        defaultValue={""}
        render={({ field }) => (
          <ProductInput
            label={"Author"}
            isInvalid={errors.author}
            errorMessage={errors.author?.message}
            field={field}
          />
        )}
      />
      <Controller
        control={control}
        name="pages"
        defaultValue={""}
        render={({ field }) => (
          <ProductInput
            label={"Pages"}
            isInvalid={errors.pages}
            errorMessage={errors.pages?.message}
            field={field}
          />
        )}
      />
      <Controller
        control={control}
        name="publisher"
        defaultValue={""}
        render={({ field }) => (
          <ProductInput
            label={"Publisher"}
            isInvalid={errors.publisher}
            errorMessage={errors.publisher?.message}
            field={field}
          />
        )}
      />
      <Controller
        control={control}
        name="publicationDate"
        defaultValue={""}
        render={({ field }) => (
          <DatePicker
            selectedDate={field.value}
            setSelectedDate={field.onChange}
            field={field}
            captionLayout="dropdown-buttons"
            fromYear={2002}
            toYear={2024}
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        defaultValue={""}
        render={({ field }) => (
          <Select
            label="Select a status"
            variant="faded"
            isInvalid={errors.status}
            errorMessage={errors.status?.message}
            selectionMode="single"
            items={productStatus}
            isRequired
            selectedKeys={
              field.value !== ""
                ? [String(field.value)]
                : initData.status && initData.status !== ""
                ? [String(initData.status)]
                : [String(productStatus[2].id)]
            }
            {...field}
          >
            {(item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            )}
          </Select>
        )}
      />
    </div>
  );
};

export default ProductDetailForm;
