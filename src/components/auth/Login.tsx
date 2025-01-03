import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { userType } from "./Register";
import { client } from "@/utils/Client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [user, setUser] = useState<userType>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      client
        .fetch(
          `*[_type == "user" && username == '${user?.name}' || email == '${user?.name}' && password == '${user?.password}']`
        )
        .then((user) => {
          setLoading(false);
          if (user?.length > 0) {
            localStorage.setItem("userInfo", JSON.stringify(user[0]));
            setUser({});
            setTimeout(() => {
              navigate("/");
            }, 0);
          }
        })
        .catch((err) => {
          setLoading(false)
          toast({ title: err?.message, variant:"destructive" });
        });
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-[2.5rem]">Sign In</h2>
      <p className="text-[#6C7275] mb-4">
        Already have an account?{" "}
        <Link to={"/auth/register"} className="text-[#38CB89]">
          Sign in
        </Link>
      </p>
      <LoginForm loading={loading} setUser={setUser} />
    </div>
  );
};

export default Login;
