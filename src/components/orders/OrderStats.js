import { cn } from "@/utils/common-functions";
import StatsCard from "../ui/StatsCard";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { Car, Loader, Ship } from "lucide-react";

const StatItem = ({ label, value, labelClassName, valueClassName }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className={cn("text-grayscale-400", labelClassName)}>{label}</span>
      <span className={cn("text-2xl text-primary font-bold", valueClassName)}>
        {value}
      </span>
    </div>
  );
};

const OrderStats = ({
  totalOrders,
  pendingOrders,
  deliveredOrders,
  canceledOrders,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-primary text-2xl">Overview</h2>
      <StatsCard
        label="Total Orders"
        value={Number(totalOrders)}
        icon={<BuildingStorefrontIcon className="h-16 w-16 text-primary-300" />}
      />
      <StatsCard
        label="Pending Orders"
        value={Number(pendingOrders)}
        customContainerClass="bg-primary-200/20"
        customLabelClass="text-grayscale-200"
        icon={<Loader className="h-16 w-16 text-primary-300" />}
      />
      <StatsCard
        label="Delivered Orders"
        value={Number(deliveredOrders)}
        customContainerClass="bg-success-300/60 text-success-300"
        customLabelClass="text-success-900"
        icon={<Ship className="h-16 w-16 text-success-300" />}
      />
      <StatsCard
        label="Cancelled Orders"
        customContainerClass="bg-danger-400 text-grayscale-950"
        customLabelClass="text-grayscale-950"
        value={Number(canceledOrders)}
      />
    </div>
  );
};

export default OrderStats;
