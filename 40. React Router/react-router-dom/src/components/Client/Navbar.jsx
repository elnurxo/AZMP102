import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code Academy | React Router
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
              to={"/contact"}
            >
              Contact
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
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
