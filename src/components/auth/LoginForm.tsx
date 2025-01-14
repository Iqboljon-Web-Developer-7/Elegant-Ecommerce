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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "@/utils/Client";
import { SANITY_LOGIN_USER } from "@/utils/Data";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username or email must be at least 6 characters.",
  }),
  password: z.string().min(2, {
    message: "Username or email must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    client
      .fetch(SANITY_LOGIN_USER(values))
      .then((user) => {
        setLoading(false);
        if (user?.length) {
          localStorage.setItem("userInfo", JSON.stringify(user[0]));
          setTimeout(() => navigate("/"), 0); // for running the code after saving user to localstorage
        }
      })
      .catch((err) => {
        setLoading(false);
        toast({ title: err?.message, variant: "destructive" });
      });
  }

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
                  placeholder="Your username or email address"
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
                <Input type="password" placeholder="Password" {...field} />
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
