import { categoriesApi } from "@/apis";
import CategoryForm from "@/components/categories.components/CategoryForm";
import { CategoriesDataTable } from "@/components/categories.components/DataTable/CategoriesDataTable";
import { columns } from "@/components/categories.components/DataTable/columns";
import MainLayout from "@/components/layouts/Layout";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/Dialog";
import useCategories from "@/hooks/useCategories";
import { handleErrorResponse } from "@/utils/common-functions";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "@nextui-org/react";

const CategoriesPage = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error, mutate } = useCategories();

  const formData = useRef({
    name: "",
    parentId: 0,
    description: "",
    image: "",
    mode: "create",
  });

  const handleOnCreateCategory = async () => {
    let bodyData = {};

    if (formData.current.parentId === 0) {
      bodyData = {
        name: formData.current.name,
        description: formData.current.description,
        image: formData.current.image,
      };
    } else {
      bodyData = {
        name: formData.current.name,
        parentId: formData.current.parentId,
        description: formData.current.description,
        image: formData.current.image,
      };
    }

    const { success, error } = await categoriesApi.createCategory(bodyData);

    if (success) {
      mutate();
      setOpen(false);
      toast.success("Category created successfully.");
      return;
    }

    if (error) {
      const { message } = handleErrorResponse(error);
      toast.error(message);
    }
  };

  const handleOnEditCategory = async () => {
    let bodyData = {};

    if (formData.current.parentId === 0) {
      bodyData = {
        name: formData.current.name,
        description: formData.current.description,
        image: formData.current.image,
      };
    } else {
      bodyData = {
        name: formData.current.name,
        parentId: formData.current.parentId,
        description: formData.current.description,
        image: formData.current.image,
      };
    }
    const { success, error } = await categoriesApi.editCategory(
      formData.current.id,
      bodyData
    );

    if (success) {
      mutate();
      setOpen(false);
      toast.success("Category updated successfully.");
      return;
    }

    if (error) {
      const { message } = handleErrorResponse(error);
      toast.error(message);
    }
  };

  const onSelectCategory = (category) => {
    formData.current = {
      id: category.id,
      name: category.name,
      parentId: category.parentId === null ? 0 : category.parentId,
      description: category.description,
      image: category.image,
      mode: "edit",
    };
    setOpen(true);
  };

  // Reset form data when dialog is closed
  useEffect(() => {
    if (!open) {
      formData.current = {
        name: "",
        parentId: 0,
        description: "",
        image: "",
        mode: "create",
      };
    }
  }, [open]);

  // Handle error
  useEffect(() => {
    if (error) {
      const { message } = handleErrorResponse(error);
      toast.error(message);
    }
  }, [error]);

  return (
    <MainLayout>
      <h2 className="tab-heading mb-4">Categories</h2>

      <ConfirmDialog
        trigger={
          <Button
            variant="primary"
            size="md"
            icon={<PlusIcon className="h-4 w-4" />}
          >
            Add
          </Button>
        }
        asChildTrigger
        title="Add category"
        onConfirm={
          formData.current.mode === "create"
            ? handleOnCreateCategory
            : handleOnEditCategory
        }
        confirmText={formData.current.mode === "create" ? "Create" : "Update"}
        desc={"Enter category data below."}
        open={open}
        setOpen={setOpen}
      >
        <CategoryForm dataRef={formData} categories={data} />
      </ConfirmDialog>

      <div className="py-10">
          <Skeleton
            isLoaded={!(isLoading || error)}
            className="rounded-md"
            
          >
            <CategoriesDataTable
              columns={columns}
              data={data}
              onSelectCategory={onSelectCategory}
            />
          </Skeleton>
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
