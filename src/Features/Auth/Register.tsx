import { Link } from "react-router-dom";
import { RegisterForm } from "./_components/RegisterForm";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-5">
        <h2 className="text-[2.5rem] text-neutral-50 md:text-black">Sign Up</h2>
        <p className="text-neutral-200 md:text-neutral-400 flex gap-1 sm:gap-4 flex-wrap">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-secondary-green">
            Sign in
          </Link>
        </p>
      </div>

      <RegisterForm />
    </motion.div>
  );
};

export default Register;
