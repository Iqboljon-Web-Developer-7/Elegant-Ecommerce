import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { client } from "@/utils/Client";
import { useToast } from "@/hooks/use-toast";
import { error } from "console";

export interface userType {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

const Register = () => {
  const [user, setUser] = useState<userType>();
  const [userExists, setuserExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const doc = {
        _id: uuidv4(),
        _type: "user",
        name: user?.name,
        username: user?.username,
        email: user?.email,
        password: user?.password,
      };

      setLoading(true);

      client
        .fetch(`*[_type == "user" && username == '${user?.username}']`)
        .then((users) => {
          setLoading(false);
          if (users?.length > 0) {
            setuserExists(true);
            toast({
              title: "User already exists",
              description: "try to create new user",
              variant: "destructive",
            });
          } else {
            client.createIfNotExists(doc).then((user) => {
              localStorage.setItem("userInfo", JSON.stringify(user));
              toast({
                title: "User successfully created",
                description: "Welcome to ELEGANT!",
              });
              setuserExists(false);
              navigate("/");
            });
          }
        })
        .catch((error) => {
          toast({
            title: error.message,
            variant: "destructive",
          });
      setLoading(false);

        });
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-[2.5rem]">Sign Up</h2>
      <p className="text-[#6C7275] mb-4">
        Already have an account?{" "}
        <Link to={"/auth/login"} className="text-[#38CB89]">
          Sign in
        </Link>
      </p>
      {userExists && (
        <p className="font-bold text-red-500 my-2">User already exists</p>
      )}
      <RegisterForm loading={loading} setUser={setUser} />
    </div>
  );
};

export default Register;
