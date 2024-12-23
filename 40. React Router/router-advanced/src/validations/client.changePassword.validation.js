import * as Yup from "yup";

const clientChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Current password must be at least 6 characters")
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
      "Invalid password format"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirmation password is required"),
});

export default clientChangePasswordSchema;
