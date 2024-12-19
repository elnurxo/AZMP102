import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import { useState } from "react";

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // Example validation logic
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    setError("");
    setSuccess(true);

    // Submit logic here
    console.log("Registration Data:", formData);

    // Reset form (optional)
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

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

        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">
            Registration successful! You can now log in.
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            required
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            label="Email Address"
            name="email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
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
            Login
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ClientRegister;
