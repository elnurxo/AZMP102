/* eslint-disable react/prop-types */
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import clientChangePasswordSchema from "../../validations/client.changePassword.validation";
import controller from "../../services/api/api";
import { ENDPOINTS } from "../../constants";

const ChangePasswordModal = ({ open, onClose, user, setUser }) => {
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: clientChangePasswordSchema,
    onSubmit: async (values, actions) => {
      try {
        if (values.currentPassword === values.newPassword) {
          toast.error("Current Password and New password cannot be the same!");
          actions.resetForm();
          return;
        }
        if (values.currentPassword === user.password) {
          // Make API call to change password
          const updatedUser = await controller.patch(ENDPOINTS.users, user.id, {
            password: values.newPassword,
          });

          // Update user data in state (if necessary)
          setUser(updatedUser);

          toast.success("Password updated successfully!");
          actions.resetForm(); // Reset the form on successful update
        } else {
          toast.error("Current Password is incorrect!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error updating password. Please try again.");
      } finally {
        onClose(); // Close modal after submission
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6">Change Password</Typography>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          onSubmit={passwordFormik.handleSubmit}
        >
          <TextField
            label="Current Password"
            variant="standard"
            type="password"
            required
            name="currentPassword"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur} // Mark field as touched when it loses focus
            value={passwordFormik.values.currentPassword}
            helperText={
              passwordFormik.touched.currentPassword &&
              passwordFormik.errors.currentPassword
                ? passwordFormik.errors.currentPassword
                : ""
            }
            error={
              passwordFormik.touched.currentPassword &&
              Boolean(passwordFormik.errors.currentPassword)
            }
          />
          <TextField
            label="New Password"
            variant="standard"
            type="password"
            required
            name="newPassword"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur} // Mark field as touched when it loses focus
            value={passwordFormik.values.newPassword}
            helperText={
              passwordFormik.touched.newPassword &&
              passwordFormik.errors.newPassword
                ? passwordFormik.errors.newPassword
                : ""
            }
            error={
              passwordFormik.touched.newPassword &&
              Boolean(passwordFormik.errors.newPassword)
            }
          />
          <TextField
            label="Confirm New Password"
            variant="standard"
            type="password"
            required
            name="confirmPassword"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur} // Mark field as touched when it loses focus
            value={passwordFormik.values.confirmPassword}
            helperText={
              passwordFormik.touched.confirmPassword &&
              passwordFormik.errors.confirmPassword
                ? passwordFormik.errors.confirmPassword
                : ""
            }
            error={
              passwordFormik.touched.confirmPassword &&
              Boolean(passwordFormik.errors.confirmPassword)
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !passwordFormik.dirty ||
              passwordFormik.isSubmitting ||
              Object.keys(passwordFormik.errors).length > 0
            }
          >
            Change Password
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 3,
};

export default ChangePasswordModal;
