import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import clientLoginSchema from "../../validations/client.login.validation";
import controller from "../../services/api/api";
import { ENDPOINTS } from "../../constants";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useEffect } from "react";

const ClientLogin = () => {
  const { user, isAuthenticated, login } = useAuth();
  console.log("user: ", user);
  const navigate = useNavigate();

  //check user log in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      console.log("values: ", values);

      const validUser = await controller.getAll(
        `${ENDPOINTS.users}?role=client&email=${values.email}`
      );

      if (validUser[0].password === values.password) {
        actions.resetForm();
        toast.success("Successfully signed in!", {
          position: "top-right",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        login(validUser[0].id);
        //local storage user
        localStorage.setItem("userId", JSON.stringify(validUser[0].id));
        setTimeout(() => {
          navigate("/");
        }, 300);
      } else {
        toast.error("Incorrect email or password", {
          position: "top-right",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    },
    validationSchema: clientLoginSchema,
  });
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          sx={{ mb: 3 }}
        >
          Login to your account
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            required
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            helperText={
              formik.touched.email && formik.errors.email && formik.errors.email
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            helperText={
              formik.touched.password &&
              formik.errors.password &&
              formik.errors.password
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={
              formik.isSubmitting ||
              !formik.dirty ||
              Object.keys(formik.errors).length > 0
            }
          >
            Login
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          Don’t have an account?{" "}
          <Button variant="text" size="small" color="primary">
            <Link to={"/register"}>Sign Up</Link>
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ClientLogin;
