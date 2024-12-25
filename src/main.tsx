import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const App = lazy(() => import("./App.tsx"));

import { Toaster } from "@/components/ui/toaster";
import Loading from "./loading.tsx";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </Provider>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
