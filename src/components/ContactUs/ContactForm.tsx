import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

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

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 inter">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400 text-xs font-bold">
                FULL NAME
              </FormLabel>
              <FormControl>
                <Input
                  className="outline-none border"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400 text-xs font-bold">
                EMAIL ADDRESS
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="outline-none border"
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400 text-xs font-bold">
                MESSAGE
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  className="outline-none border"
                  placeholder="Your message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="px-10 py-5">
          Send Message
        </Button>
      </form>
    </Form>
  );
}
