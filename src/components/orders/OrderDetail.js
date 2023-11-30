import {
  getLastCharacters,
  hashText,
  priceFormatter,
} from "@/utils/common-functions";
import OrderItem from "./OrderItem";
import dayjs from "dayjs";
import { OrderStatus } from "@/utils/constants";
import { Chip } from "@nextui-org/react";

const getOrderStatus = (status) => {
  switch (status) {
    case OrderStatus.PENDING:
      return (
        <Chip size="md" variant={"flat"} color="primary">
          {"Pending"}
        </Chip>
      );
    case OrderStatus.PROCESSED:
      return (
        <Chip
          size="md"
          variant={"flat"}
          className="bg-blue-300/20 text-blue-400/60"
        >
          {"Delivering"}
        </Chip>
      );
    case OrderStatus.DELIVERED:
      return (
        <Chip className="bg-green-300/20 text-green-400/60">{"Delivered"}</Chip>
      );
    case OrderStatus.CANCELLED:
      return (
        <Chip size="md" variant={"flat"} color="danger">
          {"Cancelled"}
        </Chip>
      );
    default:
      return null;
  }
};
const OrderDetail = ({ order, orderItems }) => {
  return (
    <div>
      <div className="flex items-center justify-between rounded-lg bg-grayscale-400/30 p-4">
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-bold">Order Id</span>
            <span>{getLastCharacters(hashText(String(order.id)))}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Date placed</span>
            <span>{dayjs(order.createdAt).format("MMM DD, YYYY")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Total amount</span>
            <span>{priceFormatter(order.total)}</span>
          </div>
        </div>
        <span>{getOrderStatus(order.status)}</span>
      </div>
      <div className="flex flex-col gap-6 p-4">
        {orderItems.map((item) => (
          <OrderItem key={item.id} {...item} />
        ))}
        <div className="flex justify-end">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4">
              <span>Subtotal</span>
              <span>{priceFormatter(order.total - order.shippingFee)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Shipping</span>
              <span>{priceFormatter(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Total</span>
              <span>{priceFormatter(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
