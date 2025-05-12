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
import { v4 as uuidv4 } from "uuid";
import { client } from "@/utils/Client";
import { SANITY_REGISTER_USER } from "@/utils/Data";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setLoading(true);
        const doc = {
          _id: uuidv4(),
          _type: "user",
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        };

        const users = await client.fetch(SANITY_REGISTER_USER(values));
        if (users.length) {
          toast({
            title: "User already exists!",
            description: "Please try to register again.",
            variant: "destructive",
          });
        } else {
          const user = await client.createIfNotExists(doc);
          localStorage.setItem("userInfo", JSON.stringify(user));
          toast({
            title: "User successfully created",
            description: "Welcome to ELEGANT!",
          });
          navigate("/");
        }
      } catch (error: any) {
        toast({
          title: error.message,
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [navigate, toast]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-sm">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="outline-none border-none bg-neutral-50"
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
                  className="outline-none border-none bg-neutral-50"
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
                  className="outline-none border-none bg-neutral-50"
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
                    className="outline-none border-none bg-neutral-50 pr-10"
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
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <div className="loader"></div> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
