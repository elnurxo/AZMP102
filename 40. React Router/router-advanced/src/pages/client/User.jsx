import {
  Box,
  Avatar,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BalanceModal from "../../components/client/BalanceModal";
import UserInfoModal from "../../components/client/UserInfoModal";
import ChangePasswordModal from "../../components/client/ChangePasswordModal";

const User = () => {
  const { user, setUser, isAuthenticated, loading } = useAuth();
  const [balanceOpen, setBalanceOpen] = useState(false);
  const [userInfoOpen, setUserInfoOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "50px auto" }} />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>User Page</title>
      </Helmet>
      <Box
        sx={{ padding: 3, display: "flex", gap: "8px", alignItems: "start" }}
      >
        <Paper
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
        <div>
          <Button
            sx={{ marginRight: "8px" }}
            onClick={() => setBalanceOpen(true)}
            color="primary"
            variant="contained"
          >
            Add Balance
          </Button>
          <Button
            sx={{ marginRight: "8px" }}
            onClick={() => setUserInfoOpen(true)}
            color="success"
            variant="contained"
          >
            Update User Info
          </Button>
          <Button
            sx={{ marginRight: "8px" }}
            onClick={() => setChangePasswordOpen(true)}
            color="secondary"
            variant="contained"
          >
            Change Password
          </Button>
        </div>

        <BalanceModal
          open={balanceOpen}
          onClose={() => setBalanceOpen(false)}
          user={user}
          setUser={setUser}
        />
        <UserInfoModal
          open={userInfoOpen}
          onClose={() => setUserInfoOpen(false)}
          user={user}
          setUser={setUser}
        />
        <ChangePasswordModal
          open={changePasswordOpen}
          onClose={() => setChangePasswordOpen(false)}
          user={user}
          setUser={setUser}
        />
      </Box>
    </>
  );
};

export default User;
