import { Route, Routes } from "react-router-dom";

import NotFound from "./components/notFound";
import Layout from "./components/Layout";
import Home from "./Features/Home/Home";
import Search from "./Features/Search";
import ContactUs from "./Features/ContactUs/ContactUs";

import Auth from "./Features/Auth/Auth";
import Product from "./Features/Product/Product";
import Products from "./Features/Products";
import AppErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import Register from "./Features/Auth/Register";
import Login from "./Features/Auth/Login";

const App = () => {
  return (
    <AppErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route
            path="products/:id"
            element={
              <Product />
            }
          />
          <Route path="contact" element={<ContactUs />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AppErrorBoundary>
  );
};

export default App;
