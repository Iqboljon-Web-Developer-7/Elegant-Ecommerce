import { useMutation } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_LOGIN_USER } from "@/utils/Data";

const loginFn = async (values: { name: string; password: string }) => {
  return await client.fetch(SANITY_LOGIN_USER(values));
};

export const useLoginApi = () => {
  return useMutation({
    mutationFn: loginFn,
  });
}; 