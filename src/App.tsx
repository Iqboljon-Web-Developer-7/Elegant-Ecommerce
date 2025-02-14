import { Route, Routes } from "react-router-dom";

import NotFound from "./components/notFound";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import Search from "./containers/Search";
import ContactUs from "./containers/ContactUs";

import Auth from "./containers/Auth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Product from "./containers/Product";
import Products from "./containers/Products";
import AppErrorBoundary from "./components/errorBoundary/ErrorBoundary";

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
