import * as Yup from "yup";

const clientLoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default clientLoginSchema;
