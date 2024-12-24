import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const App = lazy(() => import("./App.tsx"));

import { Toaster } from "@/components/ui/toaster";
import Loading from "./loading.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
