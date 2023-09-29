import useAuth from "@/hooks/useAuth";
import { setUser } from "@/store/userSlice";
import { handleErrorResponse } from "@/utils/common-functions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AdminProvider = ({ children }) => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  if (error) {
    const { message } = handleErrorResponse(error);
    toast.error(message);
    router.replace("/");
  }

  useEffect(() => {
    if (user) {
      dispatch(
        setUser({
          username: user.username,
          rank: user.adminRank,
          expire: user.exp,
        })
      );
    }
  }, [user, dispatch]);

  return isLoading || error ? (
    <div className="flex items-center justify-center h-screen text-xl text-primary-500">
      Loading...
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default AdminProvider;
