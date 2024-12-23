import * as Yup from "yup";

const clientRegisterSchema = Yup.object().shape({
  username: Yup.string()
  .matches(
    /^[a-z0-9._]+$/,
    "Username can only contain lowercase letters, digits, underscores, and dots"
  ) // Allows lowercase letters, digits, underscores, and dots
  .min(1, "Username must have at least one character")
  .max(50, "Username can't be longer than 50 characters")
  .notOneOf([""], "Username is required")
  .matches(/^(?!.*\s).*$/, "Username cannot contain spaces") // No spaces allowed
  .matches(
    /^(?![._])(?=.*[a-z0-9])[a-z0-9._]+(?<![._])$/,
    "Username cannot start or end with _ or ."
  ),
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(6)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
      "Invalid password format"
    )
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});

export default clientRegisterSchema;
