import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password should be at least 3 characters"),
});

export const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
