import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./loading";

import "react-medium-image-zoom/dist/styles.css";

const AppErrorBoundary = lazy(
  () => import("./components/molecules/ErrorBoundary")
);
const Layout = lazy(() => import("./components/molecules/Layout"));

const Home = lazy(() => import("./Features/Home/Home"));
const Search = lazy(() => import("./Features/Search"));
const ContactUs = lazy(() => import("./Features/ContactUs/ContactUs"));
const Auth = lazy(() => import("./Features/Auth/Auth"));
const Products = lazy(() => import("./Features/Products"));
const Product = lazy(() => import("./Features/Product/Product"));
const Register = lazy(() => import("./Features/Auth/Register"));
const Login = lazy(() => import("./Features/Auth/Login"));

const NotFound = lazy(() => import("./components/molecules/notFound"));
import { HelmetProvider } from "react-helmet-async";


const App = () => {
  return (
    
    <AppErrorBoundary>
      <HelmetProvider>  
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
    </HelmetProvider>
      </AppErrorBoundary>
  );
};

export default App;
