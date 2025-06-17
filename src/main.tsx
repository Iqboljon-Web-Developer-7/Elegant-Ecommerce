import { createRoot, hydrateRoot } from "react-dom/client";
import { StrictMode, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "@/styles/index.css";

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

const rootElement = document.getElementById("root");
const app = (
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);

if (rootElement?.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else if (rootElement) {
  createRoot(rootElement).render(app);
}
