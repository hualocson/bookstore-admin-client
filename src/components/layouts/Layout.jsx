import SideBar from "./Sidebar";

import {
  InboxStackIcon as productsIconOutLine,
  HomeIcon as dashboardIconOutLine,
  DocumentTextIcon as ordersIconOutLine,
} from "@heroicons/react/24/outline";

import {
  InboxStackIcon as productsIconSolid,
  HomeIcon as dashboardIconSolid,
  DocumentTextIcon as ordersIconSolid,
} from "@heroicons/react/24/solid";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    solidIcon: dashboardIconSolid,
    outlineIcon: dashboardIconOutLine,
    id: 1,
  },
  {
    name: "Products",
    href: "/products",
    solidIcon: productsIconSolid,
    outlineIcon: productsIconOutLine,
    id: 2,
  },
  {
    name: "Orders",
    href: "/orders",
    solidIcon: ordersIconSolid,
    outlineIcon: ordersIconOutLine,
    id: 3,
  },
];

const MainLayout = ({ children }) => {
  return (
    <div>
      <SideBar navigation={navigation} />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
