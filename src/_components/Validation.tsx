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

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is Required"),
});

export const AddCategorySchema = Yup.object().shape({
  name: Yup.string().required("Category is Required"),
  image: Yup.mixed().required("Image is required"),
});

export const AddBrandSchema = Yup.object().shape({
  name: Yup.string().required("BrandName is Required"),
  image: Yup.mixed().required("Image is required"),
  category:Yup.string().required('Category is Required'),
  subCategory:Yup.string().required('SubCategory is Required')
});

export const AddSubCategorySchema = Yup.object().shape({
  name: Yup.string().required("Category is Required"),
  category: Yup.mixed().required("Please Select one option"),
  image: Yup.mixed().required("Image is required"),
});
