import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const App = lazy(() => import("./App.tsx"));

import { Toaster } from "@/components/ui/toaster";

import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <Suspense
          fallback={
            <div className="w-screen h-screen flex items-center justify-center">
              <div className="loader2"></div>
            </div>
          }
        >
          <App />
        </Suspense>
      </SidebarProvider>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
