import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Avatar } from "antd";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <AppBar style={{ background: "#1E1E2D" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code Bazaar
          </Typography>
          <Button color="inherit">
            <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/about"}
            >
              About
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/products"}
            >
              Products
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/contact"}
            >
              Contact
            </Link>
          </Button>
          <Divider
            orientation="vertical"
            sx={{
              height: "28px",
              bgcolor: "white",
              margin: "0px 6px",
            }}
          />
          {user ? (
            <>
              <Button color="inherit">
                <Link to={"/user"}>
                  <Avatar
                    alt={user.username}
                    src={user.profileImage}
                    title={user.username}
                    sx={{ width: 24, height: 24 }}
                  />
                </Link>
              </Button>
              <Button
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure to logout?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Logged Out!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      logout();
                      navigate("/login");
                      Swal.fire({
                        title: "Logged Out!",
                        icon: "success",
                      });
                    }
                  });
                }}
                color="inherit"
              >
                logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={"/login"}
                >
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={"/register"}
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
