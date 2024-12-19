import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

const Header = () => {
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
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
