import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const ClientLogin = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here
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
          onSubmit={handleLogin}
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
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
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
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ClientLogin;
