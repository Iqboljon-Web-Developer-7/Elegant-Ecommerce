

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

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  name: z.string().min(6, {
    message: "name must be at least 6 characters.",
  }),
  email: z.string().min(6, {
    message: "email must be at least 6 characters.",
  }),
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
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
      if (users) {
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
  }, []);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="outline-none border-none"
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
                  className="outline-none border-none"
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
                  className="outline-none border-none"
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
                <Input
                  className="outline-none border-none"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
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
