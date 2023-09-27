import { cn } from "@/utils/common-functions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const SideBar = ({ navigation }) => {
  const [selected, setSelected] = useState(1);
  const { pathname } = useRouter();
  useEffect(() => {
    navigation.forEach((item) => {
      if (pathname.includes(item.href)) setSelected(item.id);
    });
  }, [pathname, navigation]);
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-grayscale-800 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center"></div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          item.id === selected
                            ? "bg-primary-500 text-grayscale-900"
                            : "text-grayscale-200 hover:text-grayscale-100 hover:bg-grayscale-500",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-300"
                        )}
                      >
                        {item.id === selected ? (
                          <item.solidIcon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <item.outlineIcon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-grayscale-200 hover:text-grayscale-100 hover:bg-grayscale-500"
                >
                  <img
                    className="h-6 w-6 shrink-0"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">Tom Cook</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
