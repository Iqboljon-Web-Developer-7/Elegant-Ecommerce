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
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/permamentData";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginApi } from "../hooks/useLoginApi";

const formSchema = z.object({
  name: z.string().min(6, {
    message: "Username or email must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useLoginApi();

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await mutateAsync(values);
      if (user) {
        console.log(user);

        dispatch(setUserInfo(user));
        const returnUrl = sessionStorage.getItem("returnUrl") || "/";
        sessionStorage.removeItem("returnUrl");
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate(returnUrl);
      } else {
        toast({ title: "Incorrect username or password.", variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: err?.message || "An error occurred", variant: "destructive" });
    } finally {
      form.reset();
    }
  }, [dispatch, form, navigate, toast, mutateAsync]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="loginForm" className="space-y-4 mt-8 inter">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-backgrounds-worm-grey text-sm md:text-base border-b border-b-black rounded-none focus-visible:ring-0 shadow-none"
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
      <Button
        form="loginForm"
        disabled={isPending}
        type="submit"
        className="w-full mt-8"
      >
        {isPending ? <div className="loader"></div> : "Sign In"}
      </Button>
    </Form>
  );
}
