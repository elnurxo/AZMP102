import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const User = () => {
  const { user, isAuthenticated } = useAuth();
  console.log("user: ", user);
  console.log("isAuthenticated: ", isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated == false && user == null) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <>
      <h1>{user?.username}</h1>
    </>
  );
};

export default User;
