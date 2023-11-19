import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import OrderDetail from "./OrderDetail";
import useOrderDetail from "@/hooks/useOrderDetail";
import { OrderStatus } from "@/utils/constants";
import { toast } from "react-toastify";
import { delay, handleErrorResponse } from "@/utils/common-functions";
import { ordersApi } from "@/apis";
import { useSWRConfig } from "swr";

const OrderDetailModal = ({ orderId, onCloseModal, ...order }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data } = useOrderDetail(orderId);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (orderId) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const notify = () =>
    toast.promise(handleOnApproveOrder, {
      pending: "Approving order...",
      success: {
        render({ data }) {
          return <span>{data}</span>;
        },
      },
      error: {
        render({ data }) {
          return <span>{data}</span>;
        },
      },
    });
  const handleOnApproveOrder = async () => {
    await delay(1000);

    if (order.status === OrderStatus.CANCELLED) {
      return;
    }

    const newStatus =
      order.status === OrderStatus.PENDING
        ? OrderStatus.PROCESSED
        : order.status === OrderStatus.PROCESSED
        ? OrderStatus.DELIVERED
        : OrderStatus.DELIVERED;

    const { error } = await ordersApi.updateStatus(orderId, newStatus);

    if (error) {
      const { message } = handleErrorResponse(error);
      throw message;
    } else {
      onClose();
      mutate("/orders");
      return "Order approved successfully.";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
      size={"5xl"}
      onClose={() => {
        onCloseModal();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Order details</ModalHeader>
            <ModalBody>
              {orderId && <OrderDetail order={order} orderItems={data} />}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {order.status !== OrderStatus.DELIVERED &&
                order.status !== OrderStatus.CANCELLED && (
                  <Button color="primary" onPress={notify}>
                    {order.status === OrderStatus.PENDING
                      ? "Approve"
                      : "Delivered"}
                  </Button>
                )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailModal;
