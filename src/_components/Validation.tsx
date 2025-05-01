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
  name: Yup.string().required("BrandName is Required").trim(),
  image: Yup.mixed(),
  category: Yup.string().required("Category is Required"),
  subCategory: Yup.string().required("SubCategory is Required"),
});

export const AddSubCategorySchema = Yup.object().shape({
  name: Yup.string().required("Category is Required"),
  category: Yup.mixed().required("Please Select one option"),
  image: Yup.mixed().required("Image is required"),
});

// This should match your form's structure.
export const AddProductSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Subcategory is required"),
  brand: Yup.string().required("Brand is required"),
  otherInfo: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
  status: Yup.number().required("Status is required"),
  productDetails: Yup.array().of(
    Yup.object().shape({
      variation: Yup.string().required("Variation is required"),
      productPrice: Yup.number()
        .transform((value, originalValue) => Number(originalValue) || undefined)
        .required("Price is required"),
      discount: Yup.number()
        .transform((value, originalValue) => Number(originalValue) || undefined)
        .required("Discount is required"),
      discountPrice: Yup.number()
        .transform((value, originalValue) => Number(originalValue) || undefined)
        .required("Discount price is required"),
    })
  ),
});


export const AddCoupon = Yup.object({
  name: Yup.string().required("Coupon name is required."),
  minimumPurchase: Yup.number()
    .typeError("Minimum purchase must be a number")
    .positive("Minimum purchase must be greater than zero.")
    .required("Minimum purchase is required."),
  discountPrice: Yup.number()
    .typeError("Discount price must be a number")
    .positive("Discount price must be greater than zero.")
    .required("Discount price is required."),
  startDate: Yup.date()
    .nullable()
    .required("Start date is required.")
    .test(
      "start-date-valid",
      "Start date must be a valid date",
      (value) => value !== null && value instanceof Date && !isNaN(value)
    ),
  endDate: Yup.date()
    .nullable()
    .required("End date is required.")
    .test(
      "end-date-valid",
      "End date must be a valid date",
      (value) => value !== null && value instanceof Date && !isNaN(value)
    )
    .test(
      "end-after-start",
      "End date cannot be before start date.",
      function (value) {
        const { startDate } = this.parent;
        return value && startDate ? value >= startDate : true;
      }
    ),
  couponCode: Yup.string().required("Coupon code is required."),
});

export const Configuration = {
  deliverySchema: Yup.object({
    freeDelivery: Yup.string().required("Free delivery is required"),
    deliveryCharge: Yup.string().required("Delivery charge is required"),
  }),

  taxSchema: Yup.object({
    tax: Yup.string().required("Tax is required"),
  }),
};

export const ResetPassword = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});
