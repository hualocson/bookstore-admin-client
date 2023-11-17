import { Controller } from "react-hook-form";
import ProductInput from "./ProductInput";
import { Calendar } from "@/components/ui/Calendar";
import DatePicker from "@/components/ui/DatePicker";

const ProductDetailForm = ({ control, errors }) => {
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
          />
        )}
      />
    </div>
  );
};

export default ProductDetailForm;
