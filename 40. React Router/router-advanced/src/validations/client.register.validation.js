import * as Yup from "yup";

const clientRegisterSchema = Yup.object().shape({
  username: Yup.string().min(3).max(50).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(6)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Invalid password format"
    )
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});

export default clientRegisterSchema;
