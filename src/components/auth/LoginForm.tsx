
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
import { useNavigate } from "react-router-dom";
import { client } from "@/utils/Client";
import { SANITY_LOGIN_USER } from "@/utils/Data";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/permamentData";

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
  const dispatch = useDispatch()

  const onSubmit =
    useCallback((values: z.infer<typeof formSchema>) => {
      setLoading(true);
      client
        .fetch(SANITY_LOGIN_USER(values))
        .then((user) => {
          setLoading(false);

          if (user) {
            dispatch(setUserInfo(user));

            const returnUrl = sessionStorage.getItem("returnUrl") || "/";
            sessionStorage.removeItem("returnUrl");
            navigate(returnUrl);
          } else {
            toast({ title: "User not found!", variant: "destructive" });
          }
        })
        .catch((err) => {
          setLoading(false);
          toast({ title: err?.message, variant: "destructive" });
        });
    }
      , [])

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-slate-50"
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
                <Input
                  className="bg-slate-50"
                  type="password" placeholder="Password" {...field} />
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
