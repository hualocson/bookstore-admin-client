import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { authApi } from "@/apis";
import { useEffect, useState } from "react";
import { handleErrorResponse } from "@/utils/common-functions";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const router = useRouter();

  const handleOnLogin = async () => {
    if (!formData.username || !formData.password)
      return toast.error("Please fill all fields");

    setLoading(true);
    const { error, user } = await authApi.login(formData);

    if (error !== undefined) {
      const { message } = handleErrorResponse(error);
      setTimeout(() => {
        setLoading(false);
      }, 500);

      toast.error(message);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);

      router.push("/dashboard");
      toast.success("Login success");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-lg mx-auto gap-y-4">
      <h1 className="text-xl font-bold text-primary-500">Login here</h1>
      <div className="flex flex-col gap-y-2 w-full">
        <InputField
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") handleOnLogin();
          }}
        />
      </div>
      <Button
        variant="primary"
        size="md"
        customClass="w-full"
        onClick={handleOnLogin}
        loading={loading}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
