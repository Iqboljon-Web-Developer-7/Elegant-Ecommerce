import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const App = lazy(() => import("./App.tsx"));

import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { Toaster } from "@/components/ui/toaster";
import Loading from "./loading.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </SidebarProvider>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
