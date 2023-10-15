import { productsApi } from "@/apis";
import MainLayout from "@/components/layouts/Layout";
import ProductDataTable from "@/components/products/DataTable/ProductsDataTable";
import ProductForm from "@/components/products/Form/ProductForm";
import useProducts from "@/hooks/useProducts";
import { handleErrorResponse } from "@/utils/common-functions";
import { Tab, Tabs } from "@nextui-org/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const filterOptions = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "active",
      label: "Active",
    },
    {
      id: "inactive",
      label: "Inactive",
    },
  ];

  const [filter, setFilter] = useState(filterOptions[0].id);

  const { data, isLoading, error, mutate } = useProducts(filter);

  const formData = useRef({
    id: "",
    name: "",
    categoryId: "",
    description: "",
    image: "",
    price: "",
    quantity: "",
    status: "",
  });

  const handleSubmit = async (data) => {
    let res;
    if (formData.current.id !== "") {
      res = await productsApi.update({ id: formData.current.id, ...data });
    } else {
      res = await productsApi.create(data);
    }
    const { success, error } = res;

    if (success) {
      mutate();
      toast.success(
        formData.current.id !== ""
          ? "Update book success."
          : "Product created successfully."
      );
      onClose();
      return;
    }

    if (error) {
      const { message } = handleErrorResponse(error);
      toast.error(message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  // update state data before update product
  const onSelectCategory = (productData) => {
    formData.current = { ...productData, mode: "edit" };
    onOpen();
  };

  // handle on delete click
  const onDelete = async (id) => {
    const res = await productsApi.delete(id);
    const { success, error } = res;

    if (success) {
      mutate();
      toast.success("Delete product success.");
      return;
    }

    if (error) {
      const { message } = handleErrorResponse(error);
      toast.error(message);
    }
  };

  // handle on restore click
  const onRestore = async (id) => {
    const res = await productsApi.restore(id);
    const { success, error } = res;

    if (success) {
      mutate();
      toast.success("Restore product success.");
      return;
    }

    if (error) {
      const { message } = handleErrorResponse(error);
      toast.error(message);
    }
  };

  const resetFormData = () => {
    formData.current = {
      id: "",
      name: "",
      categoryId: "",
      description: "",
      image: "",
      price: "",
      quantity: "",
      status: "",
    };
  };

  return (
    <MainLayout>
      <h2 className="tab-heading mb-4">Products</h2>
      <ProductForm
        onSubmit={handleSubmit}
        initData={formData.current}
        isOpenProp={isOpen}
        onOpenProp={onOpen}
        onCloseProp={onClose}
        resetFormData={resetFormData}
      />

      <div className="flex flex-col gap-y-6 mt-10">
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="solid"
            items={filterOptions}
            selectedKey={filter}
            onSelectionChange={setFilter}
            size="lg"
          >
            {(item) => <Tab key={item.id} title={item.label} />}
          </Tabs>
        </div>
        <ProductDataTable
          data={data}
          onSelectRow={onSelectCategory}
          onDelete={onDelete}
          onRestore={onRestore}
        />
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
