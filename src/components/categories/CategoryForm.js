import { useState } from "react";
import { Combobox } from "../ui/Combobox";
import InputWithLabel from "../ui/InputWithLabel";

const CategoryForm = ({ dataRef, categories }) => {
  const [formData, setFormData] = useState(dataRef.current);
  const onInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    dataRef.current = { ...formData, [field]: value };
  };

  return (
    <div className="flex flex-col gap-y-4">
      <InputWithLabel
        label="Name"
        id="category-name"
        placeholder="Enter name"
        value={formData.name}
        onChange={(e) => onInputChange("name", e.target.value)}
      />

      <Combobox
        label="Parent category"
        placeholder="Select parent category"
        searchPlaceholder="Search parent category..."
        data={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        onSelectedValueChange={(value) => {
          onInputChange("parentId", value);
        }}
      />

      <InputWithLabel
        label="Description"
        id="category-desc"
        placeholder="Enter description"
        value={formData.description}
        onChange={(e) => onInputChange("description", e.target.value)}
      />

      <InputWithLabel
        label="Image"
        id="category-image"
        placeholder="Enter image"
        value={formData.image}
        onChange={(e) => onInputChange("image", e.target.value)}
      />
    </div>
  );
};

export default CategoryForm;
