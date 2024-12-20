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
import clientRegisterSchema from "../../validations/client.register.validation";
import User from "../../classes/User";
import controller from "../../services/api/api";
import { ENDPOINTS } from "../../constants";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const ClientRegister = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  //check user log in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, actions) => {
      const newUser = new User(values.username, values.email, values.password);
      try {
        const users = await controller.getAll(`${ENDPOINTS.users}?role=client`);
        const duplicateUsername = users.find(
          (x) => x.username === newUser.username
        );
        const duplicateEmail = users.find((x) => x.email === newUser.email);
        if (!duplicateUsername && !duplicateEmail) {
          await controller.post(ENDPOINTS.users, newUser);
          toast.success("Successfully registered!", {
            position: "top-right",
            autoClose: 2400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          actions.resetForm();
          setTimeout(() => {
            navigate("/login");
          }, 300);
          return;
        }
        if (duplicateUsername) {
          toast.error("username already taken!", {
            position: "top-right",
            autoClose: 2400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          formik.values.username = "";
          return;
        }
        if (duplicateEmail) {
          toast.error("email already taken!", {
            position: "top-right",
            autoClose: 2400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          formik.values.email = "";
          return;
        }
      } catch (error) {
        console.error("error: ", error);
        toast.error("Failed to register, try again!", {
          position: "top-right",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        actions.resetForm();
        return;
      }
    },
    validationSchema: clientRegisterSchema,
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
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
          Create an Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          sx={{ mb: 3 }}
        >
          Join us today!
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
            label="Username"
            variant="outlined"
            fullWidth
            required
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            helperText={
              formik.touched.username &&
              formik.errors.username &&
              formik.errors.username
            }
          />
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
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            helperText={
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              formik.errors.confirmPassword
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={
              !formik.dirty ||
              formik.isSubmitting ||
              Object.keys(formik.errors).length > 0
            }
            fullWidth
          >
            Register
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          Already have an account?{" "}
          <Button variant="text" size="small" color="primary">
            <Link to={"/login"}>Login</Link>
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ClientRegister;
