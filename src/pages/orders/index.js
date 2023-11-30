import MainLayout from "@/components/layouts/Layout";
import OrdersDataTable from "@/components/orders/DataTable/OrdersDataTable";
import OrderDetailModal from "@/components/orders/OrderDetailModal";
import OrderStats from "@/components/orders/OrderStats";
import useOrderStatsToday from "@/hooks/useOrderStatsToday";
import useOrders from "@/hooks/useOrders";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const OrdersPage = () => {
  const { data } = useOrders();
  const { data: stats } = useOrderStatsToday();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOnOpenModal = (order) => {
    setSelectedOrder(order);
  };

  const handleOnCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <MainLayout>
      <h2 className="tab-heading mb-4">Orders</h2>
      {selectedOrder?.id && (
        <OrderDetailModal
          orderId={selectedOrder.id}
          onCloseModal={handleOnCloseModal}
          {...selectedOrder}
        />
      )}

      <div className="flex mt-10 gap-10">
        <div className="basis-3/4">
          <OrdersDataTable data={data} onOpenModal={handleOnOpenModal} />
        </div>
        <div className="basis-1/4">
          <OrderStats {...stats} />
        </div>
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
