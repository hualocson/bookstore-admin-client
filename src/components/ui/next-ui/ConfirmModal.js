import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function ConfirmModal({
  isOpenProps,
  onOpenProps,
  onCloseProps,
  title,
  content,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: isOpenProps,
    onOpen: onOpenProps,
    onClose: onCloseProps,
  });

  const handleConfirm = (onClose) => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <Modal
        placement="top-center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  {cancelText}
                </Button>
                <Button
                  color="danger"
                  variant="solid"
                  onPress={() => handleConfirm(onClose)}
                >
                  {confirmText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
