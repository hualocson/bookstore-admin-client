import useCategories from "@/hooks/useCategories";
import { cn } from "@/utils/common-functions";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import ProductInput from "./ProductInput";
import { useEffect, useState } from "react";

const ProductBasicFrom = ({ isShowDetail, initData, control, errors }) => {
  const { data: categories, isLoading } = useCategories();
  console.log(control);
  return (
    <div className={cn("grid gap-4 col-span-2", isShowDetail && "col-span-1")}>
      <Controller
        control={control}
        name="name"
        defaultValue={""}
        render={({ field }) => (
          <ProductInput
            label="Name"
            isInvalid={errors.name}
            errorMessage={errors.name?.message}
            field={field}
          />
        )}
      />
      <Controller
        control={control}
        name="image"
        defaultValue={""}
        render={({ field }) => (
          <ProductInput
            label="Image"
            isInvalid={errors.image}
            errorMessage={errors.image?.message}
            field={field}
          />
        )}
      />
      <Controller
        control={control}
        name="categoryId"
        defaultValue={""}
        render={({ field }) => (
          <Select
            label="Select a category"
            variant="faded"
            isInvalid={errors.categoryId}
            errorMessage={errors.categoryId?.message}
            selectionMode="single"
            items={categories.map((category) => ({
              ...category,
              id: String(category.id),
            }))}
            isRequired
            isLoading={isLoading}
            selectedKeys={
              initData.categoryId && initData.categoryId !== ""
                ? [String(initData.categoryId)]
                : field.value || []
            }
            {...field}
          >
            {(category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                textValue={category.name}
              >
                {category.name}
              </SelectItem>
            )}
          </Select>
        )}
      />
      <Controller
        control={control}
        name="price"
        render={({ field }) => (
          <ProductInput
            label={"Price"}
            isInvalid={errors.price}
            errorMessage={errors.price?.message}
            field={field}
          />
        )}
      />
      <Controller
        control={control}
        name="quantity"
        render={({ field }) => (
          <ProductInput
            label={"Quantity"}
            isInvalid={errors.quantity}
            errorMessage={errors.quantity?.message}
            field={field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            label="Description"
            variant="faded"
            labelPlacement="inside"
            {...field}
          />
        )}
      />
    </div>
  );
};

export default ProductBasicFrom;
