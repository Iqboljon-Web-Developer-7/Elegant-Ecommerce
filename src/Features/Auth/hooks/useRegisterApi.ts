import { useMutation } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_REGISTER_USER } from "@/utils/Data";
import { v4 as uuidv4 } from "uuid";

const registerFn = async (values: { name: string; username: string; email: string; password: string }) => {
  const doc = {
    _id: uuidv4(),
    _type: "user",
    name: values.name,
    username: values.username,
    email: values.email,
    password: values.password,
  };
  // Check if user exists
  const users = await client.fetch(SANITY_REGISTER_USER(values));
  if (users.length) {
    throw new Error("User already exists!");
  }
  // Create user
  return await client.createIfNotExists(doc);
};

export const useRegisterApi = () => {
  return useMutation({
    mutationFn: registerFn,
  });
}; 