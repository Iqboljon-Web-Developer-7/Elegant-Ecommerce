import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createRoot, hydrateRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import { store } from "./redux/index.ts";

import "@/styles/index.css";

import App from "./App.tsx";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <HelmetProvider>
            <App />
            <Toaster />
          </HelmetProvider>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

const rootElement = document.getElementById("root")
if (rootElement?.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else if (rootElement) {
  createRoot(rootElement).render(app);
}
