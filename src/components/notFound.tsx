import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_P9gLPYPerXMwgOV5NqHoa44F7pNegKUaw&s"
        alt="404 Not Found"
        className="w-72 h-auto mb-8"
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>

      <p className="text-lg text-gray-600 text-center">
        The page you're looking for doesn't exist or has been moved. Go back to
        the homepage and try again.
      </p>
      <Button onClick={() => navigate("/")} className="mt-4">
        Home page
      </Button>
    </div>
  );
};

export default NotFound;
