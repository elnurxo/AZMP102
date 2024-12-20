import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <article style={{ textAlign: "center", marginTop: "14%" }}>
      <h1>Oops...guess you are lost! (admin)</h1>
      <h3 style={{ marginTop: "18px" }}>404 | not found</h3>
      <Button
        onClick={() => {
          navigate("/admin");
        }}
        sx={{ marginTop: "12px" }}
        variant="outlined"
        color="success"
      >
        go back to home
      </Button>
    </article>
  );
};

export default NotFound;
