import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate authentication
    localStorage.setItem("adminAuth", "true");
    navigate("/admin");
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
