import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/assets/icons/search.svg";

const formSchema = z.object({
  search: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
});

export function SearchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <div className="ps-3 flex items-center gap-3 border border-slate-900 rounded-lg">
                <img
                  width={18}
                  height={18}
                  src={SearchIcon}
                  alt="search-button"
                />
                <FormControl>
                  <Input
                    className="text-sm focus-visible:ring-0 ring-slate-50"
                    placeholder="Search anything..."
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
