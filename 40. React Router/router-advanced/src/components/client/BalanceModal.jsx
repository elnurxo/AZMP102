/* eslint-disable react/prop-types */
// src/components/BalanceModal.jsx

import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { useFormik } from "formik";
import clientBalanceSchema from "../../validations/client.balance.validation";
import { toast } from "react-toastify";
import controller from "../../services/api/api";
import { ENDPOINTS } from "../../constants";

const BalanceModal = ({ open, onClose, user, setUser }) => {
  const balanceFormik = useFormik({
    initialValues: { balance: "" },
    validationSchema: clientBalanceSchema,
    onSubmit: async (values, actions) => {
      actions.resetForm();
      try {
        const updatedUser = await controller.patch(ENDPOINTS.users, user.id, {
          balance: user.balance + parseInt(values.balance),
        });
        setUser({ ...updatedUser });
        toast.success("Balance added successfully!");
      } catch (error) {
        console.error("error: ", error);
        toast.error("Error Occurred");
      } finally {
        onClose();
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6">Add Balance</Typography>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          onSubmit={balanceFormik.handleSubmit}
        >
          <TextField
            label="Enter Balance"
            variant="standard"
            type="number"
            required
            name="balance"
            onChange={balanceFormik.handleChange}
            onBlur={balanceFormik.handleBlur}
            value={balanceFormik.values.balance}
            helperText={balanceFormik.errors.balance}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !balanceFormik.dirty ||
              balanceFormik.isSubmitting ||
              Object.keys(balanceFormik.errors).length > 0
            }
          >
            Add
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

export default BalanceModal;
