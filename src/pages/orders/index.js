import { ordersApi } from "@/apis";
import MainLayout from "@/components/layouts/Layout";
import OrdersDataTable from "@/components/orders/DataTable/OrdersDataTable";
import OrderDetailModal from "@/components/orders/OrderDetailModal";
import OrderStats from "@/components/orders/OrderStats";
import useOrderStatsToday from "@/hooks/useOrderStatsToday";
import useOrders from "@/hooks/useOrders";
import { delay, handleErrorResponse } from "@/utils/common-functions";
import { OrderStatus } from "@/utils/constants";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data, mutate } = useOrders();
  const { data: stats } = useOrderStatsToday();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState({
    order: null,
    mode: null,
  });

  const handleOnOpenModal = (order) => {
    setSelectedOrder({
      order,
      mode: "view",
    });
  };

  const handleOnCloseModal = () => {
    setSelectedOrder({ order: null, mode: null });
  };

  const notify = () =>
    toast.promise(handleOnCancelOrder, {
      pending: "Cancel order...",
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
  const handleOnCancelOrder = async () => {
    await delay(1000);

    const { error } = await ordersApi.updateStatus(
      selectedOrder.order.id,
      OrderStatus.CANCELLED
    );

    if (error) {
      const { message } = handleErrorResponse(error);
      throw message;
    } else {
      mutate();
      onClose();
      return "Order approved successfully.";
    }
  };
  return (
    <MainLayout>
      <h2 className="tab-heading mb-4">Orders</h2>
      {selectedOrder.order?.id && selectedOrder?.mode === "view" && (
        <OrderDetailModal
          orderId={selectedOrder.order.id}
          onCloseModal={handleOnCloseModal}
          {...selectedOrder.order}
        />
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cancel Order
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to cancel this order? This action cannot
                  be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={notify}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex mt-10 gap-10">
        <div className="basis-3/4">
          <OrdersDataTable
            data={data}
            onOpenModal={handleOnOpenModal}
            onCancel={(value) => {
              setSelectedOrder({
                order: value,
                mode: "cancel",
              });
              onOpen();
            }}
          />
        </div>
        <div className="basis-1/4">
          <OrderStats {...stats} />
        </div>
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
