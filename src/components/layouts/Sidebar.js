import { cn } from "@/utils/common-functions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { authApi } from "@/apis";
import { useSelector } from "react-redux";
import { UserIcon } from "@heroicons/react/24/solid";
import Tooltip from "@/components/ui/Tooltip";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { toast } from "react-toastify";
dayjs.extend(duration);

const SideBar = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [expiredOn, setExpiredOn] = useState("");

  const [selected, setSelected] = useState(1);
  const router = useRouter();
  useEffect(() => {
    navigation.forEach((item) => {
      if (router.pathname.includes(item.href)) setSelected(item.id);
    });
  }, [router.pathname, navigation]);

  const onLogOut = async () => {
    const { error } = await authApi.logout();

    if (error === undefined) {
      toast.error("Logout success");
      router.push("/");
    }
  };

  useEffect(() => {
    if (user === undefined) return;
    const displayRemainTime = () => {
      const expireAt = dayjs(new Date(user.expire * 1000));
      const remain = expireAt.diff(dayjs(), "second");
      const remainTime = dayjs.duration(remain, "second").format("HH:mm:ss");
      setExpiredOn("Session expired on " + remainTime);

      if (remain === 300) toast.warning("Session will expire in 5 minutes");

      if (remain <= 0) {
        toast.error("Session expired");
        router.push("/");
      }
    };

    const interval = setInterval(() => {
      displayRemainTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [user, router]);

  return (
    <>
      <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
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
              <li className="mt-auto flex items-center justify-between">
                <Tooltip
                  trigger={
                    <div className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-grayscale-200 hover:text-grayscale-100 hover:bg-grayscale-500">
                      <UserIcon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{user?.username ?? "Not user"}</span>
                    </div>
                  }
                  customClassName="bg-grayscale-200/10 backdrop-blur-md ring-1 ring-grayscale-200/20 p-1 text-xs"
                  content={
                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <span className="text-grayscale-200 font-bold z-10">
                        {`Rank: ${user?.rank ?? "Not user"}`}
                      </span>
                      <span>{expiredOn}</span>
                    </div>
                  }
                  delayDuration={200}
                  side="top"
                  align="start"
                />

                <Tooltip
                  asChild
                  trigger={
                    <Button
                      variant="secondary"
                      size="sm"
                      customClass="border-danger-500 text-danger-500 hover:bg-danger-600 hover:text-grayscale-100"
                      icon={
                        <ArrowRightOnRectangleIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      }
                      onClick={onLogOut}
                    />
                  }
                  customClassName="bg-danger-600/10 backdrop-blur-md ring-1 ring-danger-600/20 p-1 text-xs"
                  delayDuration={200}
                  content={<span className="text-danger-500">Log Out</span>}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
