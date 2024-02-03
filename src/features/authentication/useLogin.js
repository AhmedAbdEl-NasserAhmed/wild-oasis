import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as LoginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
