import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "./components/malecules/notFound";
import Layout from "./components/malecules/Layout";
import AppErrorBoundary from "./components/malecules/errorBoundary/ErrorBoundary";
import Loading from "./loading";

const Home = lazy(() => import("./Features/Home/Home"));
const Search = lazy(() => import("./Features/Search"));
const ContactUs = lazy(() => import("./Features/ContactUs/ContactUs"));
const Auth = lazy(() => import("./Features/Auth/Auth"));
const Products = lazy(() => import("./Features/Products"));
const Product = lazy(() => import("./Features/Product/Product"));
const Register = lazy(() => import("./Features/Auth/Register"));
const Login = lazy(() => import("./Features/Auth/Login"));

const App = () => {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="/auth" element={<Auth />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppErrorBoundary>
  );
};

export default App;
