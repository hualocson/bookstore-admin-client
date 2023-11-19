import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProductBasicFrom from "./ProductBasicFrom";
import ProductDetailForm from "./ProductDetailForm";
import schema from "./schema";

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

  const [isShowDetail, setIsShowDetail] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    unregister,
  } = useForm({
    values: {
      ...initData,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isShowDetail === false) {
      unregister("author");
      unregister("pages");
      unregister("publisher");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowDetail]);

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
        size={isShowDetail ? "5xl" : "lg"}
        onClose={() => {
          clearErrors();
          resetFormData();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {initData.id !== "" ? "Update product" : "Add new book"}
                <Switch
                  isSelected={isShowDetail}
                  onValueChange={setIsShowDetail}
                  size="sm"
                >
                  Show detail
                </Switch>
              </ModalHeader>
              <ModalBody className="grid grid-cols-2">
                <ProductBasicFrom
                  isShowDetail={isShowDetail}
                  initData={initData}
                  control={control}
                  errors={errors}
                />
                {isShowDetail && (
                  <ProductDetailForm control={control} errors={errors} />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
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
