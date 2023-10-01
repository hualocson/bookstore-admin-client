import SideBar from "./Sidebar";

import {
  InboxStackIcon as productsIconOutLine,
  HomeIcon as dashboardIconOutLine,
  DocumentTextIcon as ordersIconOutLine,
  FolderIcon as assetsIconOutLine,
} from "@heroicons/react/24/outline";

import {
  InboxStackIcon as productsIconSolid,
  HomeIcon as dashboardIconSolid,
  DocumentTextIcon as ordersIconSolid,
  FolderIcon as assetsIconSolid,
} from "@heroicons/react/24/solid";
import AdminProvider from "./AdminProvider";

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
  {
    name: "Assets",
    href: "/assets",
    solidIcon: assetsIconSolid,
    outlineIcon: assetsIconOutLine,
    id: 4,
  },
];

const MainLayout = ({ children }) => {
  return (
    <AdminProvider>
      <SideBar navigation={navigation} />
      <main className="py-10 pl-44">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </AdminProvider>
  );
};

export default MainLayout;