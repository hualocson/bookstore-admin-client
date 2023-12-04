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
import Image from "next/image";

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

  const [previewImageUrl, setPreviewImageUrl] = useState("");

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
      unregister("status");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowDetail]);

  useEffect(() => {
    setPreviewImageUrl(initData.image);
  }, [initData.image]);

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
        size={"5xl"}
        onClose={() => {
          clearErrors();
          setPreviewImageUrl("");
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
                <div className="flex flex-col gap-4 justify-start items-center">
                  {previewImageUrl.startsWith("https://res.cloudinary.com") ? (
                    <Image
                      src={previewImageUrl}
                      width={250}
                      height={120}
                      onError={() => {
                        setPreviewImageUrl("/books-logo.svg");
                      }}
                      className="object-contain h-auto rounded shadow-lg"
                      priority
                      alt={`product-image-${initData.id}`}
                    />
                  ) : (
                    <div className="w-full h-full bg-grayscale-950/40 ring-2 ring-grayscale-100/20 rounded-lg flex items-center justify-center">
                      No image preview
                    </div>
                  )}

                  {isShowDetail && (
                    <ProductDetailForm
                      initData={initData}
                      control={control}
                      errors={errors}
                    />
                  )}
                </div>
                <ProductBasicFrom
                  initData={initData}
                  control={control}
                  errors={errors}
                  image={previewImageUrl}
                  onImageChange={setPreviewImageUrl}
                />
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
