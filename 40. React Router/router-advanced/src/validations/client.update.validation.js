import * as Yup from "yup";

const updateUserSchema = Yup.object().shape({
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
  email: Yup.string().email("Invalid email format").required(),
  profileImage: Yup.mixed()
    .test(
      "fileType",
      "Unsupported file type. Only images are allowed",
      (value) => {
        if (!value) return true; // If no file is selected yet, skip validation
        return value && value.type.startsWith("image/");
      }
    )
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return true; // If no file is selected yet, skip validation
      return value && value.size <= 5 * 1024 * 1024; // 5MB
    }),
});

export default updateUserSchema;
