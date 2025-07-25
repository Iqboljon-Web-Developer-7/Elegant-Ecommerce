import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRegisterApi } from "../hooks/useRegisterApi";
import { setUserInfo } from "@/redux/slices/permamentData";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  name: z.string().min(6, {
    message: "Name must be at least 6 characters.",
  }),
  email: z.string().min(6, {
    message: "Email must be at least 6 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync, isPending } = useRegisterApi();

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        const user = await mutateAsync(values);
        dispatch(setUserInfo(user));
        toast({
          title: "User successfully created",
          description: "Welcome to ELEGANT!",
        });
        navigate("/");
      } catch (error: any) {
        toast({
          title: error.message || "An error occurred",
          description: error.message === "User already exists!" ? "Please try to register again." : undefined,
          variant: "destructive",
        });
        console.error(error);
      }
    },
    [navigate, toast, mutateAsync]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="registerForm" className="space-y-4 text-sm mt-8 inter">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-backgrounds-worm-grey text-sm md:text-base border-b border-b-black rounded-none focus-visible:ring-0 shadow-none"

                  placeholder="Your Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-backgrounds-worm-grey text-sm md:text-base border-b border-b-black rounded-none focus-visible:ring-0 shadow-none"

                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  className="bg-backgrounds-worm-grey text-sm md:text-base border-b border-b-black rounded-none focus-visible:ring-0 shadow-none"

                  placeholder="Your Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    className="bg-backgrounds-worm-grey text-sm md:text-base border-b border-b-black rounded-none focus-visible:ring-0 shadow-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Button disabled={isPending} form="registerForm" type="submit" className="w-full mt-8">
        {isPending ? <div className="loader"></div> : "Sign Up"}
      </Button>
    </Form>
  );
}
