import { LoginForm } from "./_components/LoginForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-5">
        <h2 className="text-[2.5rem] text-neutral-50 md:text-black">Sign In</h2>
        <p className="text-neutral-200 md:text-neutral-400 mb-4 flex gap-4">
          Don’t have an accout yet? Sign Up?{" "}
          <Link to={"/auth/register"} className="text-secondary-green">
            Sign up
          </Link>
        </p>
      </div>
      <LoginForm />
    </motion.div>
  );
};

export default Login;
