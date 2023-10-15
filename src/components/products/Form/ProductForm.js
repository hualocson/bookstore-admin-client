import { MyButton as Button } from "@/components/ui/next-ui/MyButton";
import useCategories from "@/hooks/useCategories";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button as NextButton,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import schema from "./Schema";

const ProductForm = ({
  onSubmit,
  initData,
  isOpenProp,
  onOpenProp,
  onCloseProp,
  resetFormData,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  });
  const { data: categories, isLoading } = useCategories();

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm({
    values: {
      ...initData,
    },
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Button onPress={onOpen} color="primary" size="md">
        {"Add"}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        size="lg"
        onClose={() => {
          clearErrors();
          resetFormData();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {"Add new book"}
              </ModalHeader>
              <ModalBody>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      autoFocus
                      label="Name"
                      labelPlacement="inside"
                      variant="faded"
                      classNames={{
                        inputWrapper: [
                          "group-data-[focus=true]:border-primary",
                          "group-data-[focus-visible=true]:ring-0",
                          "group-data-[focus-visible=true]:ring-offset-0",
                        ],
                      }}
                      isInvalid={false}
                      errorMessage={errors.name?.message}
                      autoComplete="off"
                      isRequired
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <Input
                      label="Image"
                      labelPlacement="inside"
                      variant="faded"
                      classNames={{
                        inputWrapper: [
                          "group-data-[focus=true]:border-primary",
                          "group-data-[focus-visible=true]:ring-0",
                          "group-data-[focus-visible=true]:ring-offset-0",
                        ],
                      }}
                      isInvalid={errors.image}
                      errorMessage={errors.image?.message}
                      onValueChange={field.onChange}
                      {...field}
                      autoComplete="off"
                      isRequired
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select
                      label="Select a category"
                      variant="faded"
                      isInvalid={errors.categoryId}
                      errorMessage={errors.categoryId?.message}
                      selectionMode="single"
                      items={categories}
                      isRequired
                      isLoading={isLoading}
                      defaultSelectedKeys={
                        initData.categoryId !== ""
                          ? [initData.categoryId.toString()]
                          : []
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
                    <Input
                      label="Price"
                      labelPlacement="inside"
                      variant="faded"
                      classNames={{
                        inputWrapper: [
                          "group-data-[focus=true]:border-primary",
                          "group-data-[focus-visible=true]:ring-0",
                          "group-data-[focus-visible=true]:ring-offset-0",
                        ],
                      }}
                      isInvalid={errors.price}
                      errorMessage={errors.price?.message}
                      onValueChange={field.onChange}
                      {...field}
                      autoComplete="off"
                      isRequired
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => (
                    <Input
                      label="Quantity"
                      labelPlacement="inside"
                      variant="faded"
                      classNames={{
                        inputWrapper: [
                          "group-data-[focus=true]:border-primary",
                          "group-data-[focus-visible=true]:ring-0",
                          "group-data-[focus-visible=true]:ring-offset-0",
                        ],
                      }}
                      isInvalid={errors.quantity}
                      errorMessage={errors.quantity?.message}
                      {...field}
                      autoComplete="off"
                      isRequired
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
              </ModalBody>
              <ModalFooter>
                <NextButton color="danger" variant="light" onPress={onClose}>
                  Close
                </NextButton>
                <Button color="primary" onPress={handleSubmit(onSubmit)}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductForm;
