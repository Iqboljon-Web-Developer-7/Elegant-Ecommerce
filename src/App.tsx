import { Route, Routes } from "react-router-dom";
import Auth from "./containers/Auth";
import Home from "./containers/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/notFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
