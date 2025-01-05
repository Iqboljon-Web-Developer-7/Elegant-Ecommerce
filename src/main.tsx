import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const App = lazy(() => import("./App.tsx"));

import "./index.css";
import "react-medium-image-zoom/dist/styles.css";
import { Provider } from "react-redux";
import { store } from "./redux/index.ts";

import { Toaster } from "@/components/ui/toaster";
import Loading from "./loading.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </Provider>
      <Toaster />
      <Analytics />
    </BrowserRouter>
  </StrictMode>
);
