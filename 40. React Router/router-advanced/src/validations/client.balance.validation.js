import * as Yup from "yup";

const clientBalanceSchema = Yup.object().shape({
  balance: Yup.number().positive().min(0).max(1000).required(),
});

export default clientBalanceSchema;
