import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Snackbar,
  Paper,
  CircularProgress,
} from "@mui/material";
import controller from "../../services/api/api";
import Message from "../../classes/Message";
import { useFormik } from "formik";
import contactSchema from "../../validations/contact.validation";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
    onSubmit: async (values, actions) => {
      const { email, subject, phoneNumber, message } = values;
      setLoading(true);

      try {
        //form reset
        actions.resetForm();
        const newMessage = new Message(email, phoneNumber, subject, message);
        await controller.post("/messages", newMessage);
        setSnackbarMessage("Message sent successfully!");
      } catch (error) {
        console.error(error);
        setSnackbarMessage("Error sending message. Please try again.");
      } finally {
        setLoading(false);
        setOpenSnackbar(true);
      }
    },
    validationSchema: contactSchema,
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Get in Touch
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ mb: 2 }}
            helperText={
              formik.errors.email && formik.touched.email && formik.errors.email
            }
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ mb: 2 }}
            helperText={formik.errors.phoneNumber}
          />
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ mb: 2 }}
            helperText={formik.errors.subject}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            name="message"
            multiline
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.message}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color={Object.keys(formik.errors).length > 0 ? "error" : "primary"}
            fullWidth
            disabled={
              !formik.dirty ||
              formik.isSubmitting ||
              Object.keys(formik.errors).length > 0
            }
            sx={{ mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Send Message"
            )}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3500}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Container>
  );
};

export default Contact;
