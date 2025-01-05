import { Link } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

const Register = () => {
  return (
    <div>
      <h2 className="text-[2.5rem]">Sign Up</h2>
      <p className="text-neutral-400 mb-4">
        Already have an account?{" "}
        <Link to={"/auth/login"} className="text-secondary-green">
          Sign in
        </Link>
      </p>

      <RegisterForm />
    </div>
  );
};

export default Register;
