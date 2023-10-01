import useAuth from "@/hooks/useAuth";
import { setUser } from "@/store/userSlice";
import { handleErrorResponse } from "@/utils/common-functions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminProvider = ({ children }) => {
  const { user, isLoading, error } = useAuth();
  const reduxUser = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      const { message } = handleErrorResponse(error);
      toast.error(message);
      router.replace("/");
    }

    if (!user) return;
    if (!reduxUser.username || !reduxUser.rank || !reduxUser.expire) {
      dispatch(
        setUser({
          username: user.username,
          rank: user.adminRank,
          expire: user.exp,
        })
      );
    }
  }, [reduxUser, dispatch, user, error, router]);

  return isLoading || error ? (
    <div className="flex items-center justify-center h-screen text-xl text-primary-500">
      Loading...
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default AdminProvider;
