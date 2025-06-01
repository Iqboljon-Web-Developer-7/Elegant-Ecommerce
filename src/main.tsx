import { createRoot } from "react-dom/client";
import { StrictMode, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import "@/styles/index.css";
import "react-medium-image-zoom/dist/styles.css";

import { Provider } from "react-redux";
import { store } from "./redux/index.ts";

import App from "./App.tsx";

const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((module) => ({
    default: module.Toaster,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
