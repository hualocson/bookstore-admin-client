import SideBar from "./Sidebar";

import {
  InboxStackIcon as productsIconOutLine,
  HomeIcon as dashboardIconOutLine,
  DocumentTextIcon as ordersIconOutLine,
  FolderIcon as assetsIconOutLine,
  TagIcon as categoriesIconOutLine,
} from "@heroicons/react/24/outline";

import {
  InboxStackIcon as productsIconSolid,
  HomeIcon as dashboardIconSolid,
  DocumentTextIcon as ordersIconSolid,
  FolderIcon as assetsIconSolid,
  TagIcon as categoriesIconSolid,
} from "@heroicons/react/24/solid";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
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
    name: "Categories",
    href: "/categories",
    solidIcon: categoriesIconSolid,
    outlineIcon: categoriesIconOutLine,
    id: 3,
  },
  {
    name: "Orders",
    href: "/orders",
    solidIcon: ordersIconSolid,
    outlineIcon: ordersIconOutLine,
    id: 4,
  },
  {
    name: "Assets",
    href: "/assets",
    solidIcon: assetsIconSolid,
    outlineIcon: assetsIconOutLine,
    id: 5,
  },
];

const MainLayout = ({ children }) => {
  return (
    <>
      <SideBar navigation={navigation} />
      <main className="py-10 pl-44">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
