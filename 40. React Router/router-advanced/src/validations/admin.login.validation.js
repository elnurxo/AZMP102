import * as Yup from "yup";

const adminLoginSchema = Yup.object().shape({
  username: Yup.string().min(3).max(100).required(),
  password: Yup.string().required(),
});

export default adminLoginSchema;
