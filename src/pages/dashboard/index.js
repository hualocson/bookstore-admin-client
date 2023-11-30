import TopProductTable from "@/components/dashboard/DataTable/TopProductTable";
import MainLayout from "@/components/layouts/Layout";
import { Calendar } from "@/components/ui/Calendar";
import StatsCard from "@/components/ui/StatsCard";
import useStats from "@/hooks/useStats";
import {
  UserGroupIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const DashboardPage = () => {
  const { data } = useStats();
  const [selectedDate, setSelectedDate] = useState(undefined);
  return (
    <MainLayout>
      <h2 className="tab-heading mb-4">Dashboard</h2>
      {data && (
        <div className="grid grid-flow-col auto-cols-fr gap-6">
          <StatsCard
            label={"Total Customers"}
            value={data.totalCustomers}
            icon={<UserGroupIcon className="h-16 w-16 text-primary-300" />}
          />
          <StatsCard
            label={"Total Orders"}
            value={data.totalOrders}
            icon={
              <BuildingStorefrontIcon className="h-16 w-16 text-primary-300" />
            }
          />
          <StatsCard
            label={"Total Revenue"}
            value={data.totalRevenue}
            format="currency"
            customContainerClass={"bg-success-400/60"}
            icon={<CurrencyDollarIcon className="h-16 w-16 text-success-200" />}
          />
          <StatsCard
            label={"Average Sales"}
            value={Number(data.totalRevenue) / Number(data.totalOrders)}
            format="currency"
            customContainerClass={"bg-success-600/30"}
            icon={<ReceiptPercentIcon className="h-16 w-16 text-success-300" />}
          />
        </div>
      )}
      <div className="flex flex-col mt-10 gap-4">
        <h3>Top selling products</h3>

        <div className="flex gap-10 items-start">
          <div className="basis-2/3 flex flex-col gap-4">
            <TopProductTable data={data?.topSellingProducts ?? []} />
          </div>
          <div className="bg-default-100 rounded-lg">
            <Calendar
              mode="single"
              initialFocus
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
