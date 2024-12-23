import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

export const InternetErr = () => {
  toast({
    title: "Check internet connection!",
    description: "try to check your internet and then refresh the page!",
    variant: "destructive",
  });

  return <></>;
};
