import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Paper,
} from "@mui/material";

const User = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
      }}
    >
      {/* User Profile Header */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 3,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          src={user.profileImage}
          alt={user.username}
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />
        <Typography variant="h5" fontWeight="bold" mt={2}>
          {user.username}
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Balance: ${user.balance.toFixed(2)}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          mt={2}
          display="block"
        >
          Member since: {new Date(user.createdAt).toLocaleDateString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default User;
