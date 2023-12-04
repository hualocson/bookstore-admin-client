import { priceFormatter } from "@/utils/common-functions";
import Image from "next/image";
import React from "react";

const OrderItem = ({ image, name, quantity, author, price }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-10">
        <Image
          src={image}
          alt="Book Cover"
          width={120}
          height={160}
          className="basis-1/12 rounded-lg object-contain shadow-lg"
        />
        <div className="flex-grow">
          <div className="flex items-center justify-between font-bold">
            <p className="line-clamp-4 max-w-md">{name}</p>
            <p>{priceFormatter(price * quantity || 0)}</p>
          </div>
          <p>{author || "Unknown"}</p>
          <p>{`Qty - ${quantity || 0}`}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
