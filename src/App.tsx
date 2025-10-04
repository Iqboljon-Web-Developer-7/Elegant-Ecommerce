import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import "react-medium-image-zoom/dist/styles.css";
import Loading from "./loading";

import AppErrorBoundary from "./components/molecules/ErrorBoundary"
import Layout from "./components/molecules/Layout"
import PrivacyPolicy from "./Features/PrivacyPolicy";
import TermsOfUse from "./Features/TermsOfUse";

const Home = lazy(() => import("./Features/Home/Home"));
const Search = lazy(() => import("./Features/Search"));
const ContactUs = lazy(() => import("./Features/ContactUs/ContactUs"));
const Auth = lazy(() => import("./Features/Auth/Auth"));
const Products = lazy(() => import("./Features/Products"));
const Product = lazy(() => import("./Features/Product/Product"));
const Register = lazy(() => import("./Features/Auth/Register"));
const Login = lazy(() => import("./Features/Auth/Login"));

const NotFound = lazy(() => import("./components/molecules/notFound"));

const App = () => {
  const pathname = useLocation().pathname

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])


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
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-use" element={<TermsOfUse />} />
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
