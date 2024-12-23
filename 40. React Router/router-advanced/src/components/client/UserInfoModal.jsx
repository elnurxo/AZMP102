/* eslint-disable react/prop-types */
// src/components/UserInfoModal.jsx

import {
  Box,
  Typography,
  TextField,
  Button,
  Input,
  Modal,
} from "@mui/material";
import { useFormik } from "formik";
import updateUserSchema from "../../validations/client.update.validation.js";
import { uploadImageToCloudinary } from "../../utils/cloudinaryService";
import { toast } from "react-toastify";
import controller from "../../services/api/api.js";
import { ENDPOINTS } from "../../constants";

const UserInfoModal = ({ open, onClose, user, setUser }) => {
  const userFormik = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      profileImage: "", // Only handle file input changes
    },
    validationSchema: updateUserSchema,
    enableReinitialize: true, // This ensures the form is reinitialized with updated user data when the modal opens
    onSubmit: async (values, actions) => {
      try {
        let profileImageUrl = user.profileImage;
        let profileImagePublicId = user.profileImagePublicId;

        // Check for duplicate username and email
        const allUsers = await controller.getAll(
          `${ENDPOINTS.users}?role=client`
        );

        const checkDuplicateUsername = allUsers.find((x) => {
          return x.username === values.username && x.id != user.id;
        });
        const checkDuplicateEmail = allUsers.find((x) => {
          return x.email === values.email && x.id != user.id;
        });

        console.log("all users: ", allUsers);
        console.log("user: ", user);
        console.log("check username: ", checkDuplicateUsername);
        console.log("check email: ", checkDuplicateEmail);
        // Prevent form submission if username or email already exist
        if (checkDuplicateUsername) {
          toast.error("Username already taken");
          actions.setFieldError("username", "Username already taken");
          return; // Prevent form submission
        }
        if (checkDuplicateEmail) {
          toast.error("Email already taken");
          actions.setFieldError("email", "Email already taken");
          return; // Prevent form submission
        }

        // Handle profile image upload if provided
        if (values.profileImage) {
          const cloudinaryResponse = await uploadImageToCloudinary(
            values.profileImage
          );
          profileImageUrl = cloudinaryResponse.secure_url;
          profileImagePublicId = cloudinaryResponse.public_id;
        }

        // Prepare the updated user object
        const updatedUser = {
          username: values.username,
          email: values.email,
          profileImage: profileImageUrl,
          profileImagePublicId: profileImagePublicId,
        };

        // Send the update request to the backend
        await controller.patch(ENDPOINTS.users, user.id, updatedUser);

        // Update the user state in the parent component
        setUser({
          ...user,
          username: values.username,
          email: values.email,
          profileImage: profileImageUrl,
          profileImagePublicId: profileImagePublicId,
        });

        // Show success toast
        toast.success("User Data Updated!");
        actions.resetForm(); // Reset form after submission
      } catch (error) {
        console.error("error: ", error);
        toast.error("Error Occurred");
      } finally {
        onClose(); // Close the modal after submission or error
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6">Update User Info</Typography>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          onSubmit={userFormik.handleSubmit}
        >
          <TextField
            label="Update Username"
            variant="standard"
            name="username"
            onChange={userFormik.handleChange}
            value={userFormik.values.username}
            helperText={userFormik.errors.username}
            error={Boolean(userFormik.errors.username)}
          />
          <TextField
            label="Update Email"
            variant="standard"
            name="email"
            onChange={userFormik.handleChange}
            value={userFormik.values.email}
            helperText={userFormik.errors.email}
            error={Boolean(userFormik.errors.email)}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              userFormik.setFieldValue("profileImage", e.target.files[0])
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !userFormik.dirty ||
              userFormik.isSubmitting ||
              Object.keys(userFormik.errors).length > 0
            }
          >
            Update
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

export default UserInfoModal;
