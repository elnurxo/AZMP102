import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  phoneNumber: Yup.number().required(),
  subject: Yup.string().required(),
  message: Yup.string()
    .min(5, "message length should be at least 5 chars")
    .max(100)
    .required(),
});

export default contactSchema;
