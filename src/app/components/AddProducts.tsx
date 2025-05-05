import { useFormik } from "formik";
import React, { useEffect } from "react";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import plus from "../../../public/images/plus.svg";
import Image from "next/image";
import uploadImage from "../../../public/images/upload.png";
import { AddProductSchema } from "@/_components/Validation";
import { ProductDetailInput } from "./ProductDetailInput";
import OtherInfoInput from "./OtherInfoInput";
import { buildFormData } from "./BuildFormData";

interface ProductDetail {
  variation: string;
  productPrice: string;
  discount: string;
  discountPrice: string;
}

interface OtherInfo {
  title: string;
  description: string;
}

interface FormValues {
  name: string;
  category: string;
  image: File | string | null;
  subCategory: string;
  brand: string;
  otherInfo: OtherInfo[];
  status: number;
  productDetails: ProductDetail[];
}

interface Category {
  No: number;
  Category_Name: string;
}

interface SubCategory {
  No: number;
  SubCategory_Name: string;
}

interface Brand {
  No: number;
  Brand_Name: string;
}

interface ProductDetailData {
  Product_Name: string;
  Variation: string;
  Product_Price: string;
  Discount: string;
  Discount_Price: string;
  Stock_Status: number;
  Title: string;
  Description: string;
  Image: string;
}

interface SelectBox {
  Category_id: number;
  SubCategory_id: number;
  Brand_id: number;
}

interface AddProductsProps {
  brand?: Brand[];
  category?: Category[];
  subCategory?: SubCategory[];
  getProduct: () => void;
  getProductDetail?: ProductDetailData;
  variationId?: string;
  selectBox?: SelectBox;
  newProductId?: string;
}

const AddProducts = ({
  brand = [],
  category = [],
  subCategory = [],
  getProduct,
  getProductDetail,
  variationId,
  selectBox,
  newProductId,
}: AddProductsProps) => {
  const router = useRouter();
  console.log("variationId", newProductId);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      name: "",
      category: "",
      image: null,
      subCategory: "",
      brand: "",
      otherInfo: [
        {
          title: "",
          description: "",
        },
      ],
      status: 0,
      productDetails: [
        {
          variation: "",
          productPrice: "",
          discount: "",
          discountPrice: "",
        },
      ],
    },
    validationSchema: AddProductSchema,
    onSubmit: async (values) => {
      try {
        const formData = buildFormData(values, variationId, newProductId);
        const res = await apiRequest({
          method: "post",
          url: "/add_product",
          data: formData,
        });

        if (res?.status === 200) {
          toast.success(res?.data?.data?.MESSAGE);
          router.push("/products");
          getProduct();
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error: unknown) {
        console.log("Error: ", error);
        if (error && typeof error === "object" && "response" in error) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err?.response?.data?.message);
        }
      }
    },
  });

  useEffect(() => {
    console.log("getProductDetail:", getProductDetail);
    if (getProductDetail && variationId && selectBox) {
      setFieldValue("name", getProductDetail?.Product_Name || "");
      setFieldValue("category", selectBox?.Category_id?.toString() || "");
      setFieldValue("subCategory", selectBox?.SubCategory_id?.toString() || "");
      setFieldValue("brand", selectBox?.Brand_id?.toString() || "");
      setFieldValue("status", getProductDetail?.Stock_Status || 0);

      const productDetailsArray = [
        {
          variation: getProductDetail?.Variation || "",
          productPrice: getProductDetail?.Product_Price || "",
          discount: getProductDetail?.Discount || "",
          discountPrice: getProductDetail?.Discount_Price || "",
        },
      ];
      setFieldValue("productDetails", productDetailsArray);

      const otherDetails = [
        {
          title: getProductDetail?.Title || "",
          description: getProductDetail?.Description || "",
        },
      ];

      setFieldValue("otherInfo", otherDetails);

      if (getProductDetail?.Image) {
        setFieldValue("image", getProductDetail.Image);
      }

      console.log("imagePassed", getProductDetail.Image);
    }
  }, [getProductDetail, variationId, setFieldValue, selectBox]);

  const addProductDetail = () => {
    const newDetails = [
      ...values?.productDetails,
      {
        variation: "",
        productPrice: "",
        discount: "",
        discountPrice: "",
      },
    ];
    setFieldValue("productDetails", newDetails);
  };

  const addOtherInfo = () => {
    const newOtherInfo = [
      ...values.otherInfo,
      {
        title: "",
        description: "",
      },
    ];
    setFieldValue("otherInfo", newOtherInfo);
  };

  const removeProductDetail = (index: number) => {
    const updatedDetails = [...values?.productDetails];
    updatedDetails.splice(index, 1);
    setFieldValue("productDetails", updatedDetails);
  };

  const removeOtherInfo = (index: number) => {
    const updatedInfo = [...values.otherInfo];
    updatedInfo.splice(index, 1);
    setFieldValue("otherInfo", updatedInfo);
  };

  return (
    <div className=" mt-4 flex items-center justify-center ">
      <form
        className="flex flex-col bg-white shadow-xl  gap-3 p-10  w-screen"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl">
          {variationId ? "Edit Product" : "Add Product"}
        </h1>

        {/* Main Fields */}
        <div className="flex justify-between flex-wrap">
          {/* Name */}
          <div className="flex flex-col mt-3 gap-2">
            <span className="text-gray-400 font-bold">Item Name</span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[42px] p-1"
              placeholder="Item Name"
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col mt-3 gap-2">
            <span className="text-gray-400 font-bold">Category</span>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[300px]  border border-gray-400 focus:outline-none bg-white text-black h-[42px] p-1"
            >
              <option value="">Select</option>
              {category?.map((data) => (
                <option key={data?.No} value={data?.No.toString()}>
                  {data.Category_Name}
                </option>
              ))}
            </select>
            {errors.category && touched.category && (
              <div className="text-red-500">{errors.category}</div>
            )}
          </div>

          {/* Sub Category */}
          <div className="flex flex-col mt-3 gap-2">
            <span className="text-gray-400 font-bold">Sub Category</span>
            <select
              name="subCategory"
              value={values.subCategory}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[300px]  border border-gray-400 focus:outline-none bg-white text-black h-[42px] p-1"
            >
              <option value="">Select</option>
              {subCategory?.map((data) => (
                <option key={data?.No} value={data?.No.toString()}>
                  {data.SubCategory_Name}
                </option>
              ))}
            </select>
            {errors.subCategory && touched.subCategory && (
              <div className="text-red-500">{errors.subCategory}</div>
            )}
          </div>

          {/* Brand */}
          <div className="flex flex-col mt-3 gap-2">
            <span className="text-gray-400 font-bold">Brand</span>
            <select
              name="brand"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[300px]  border border-gray-400 focus:outline-none bg-white text-black h-[42px] p-1"
            >
              <option value="">Select</option>
              {brand?.map((data) => (
                <option key={data?.No} value={data?.No.toString()}>
                  {data.Brand_Name}
                </option>
              ))}
            </select>
            {errors.brand && touched.brand && (
              <div className="text-red-500">{errors.brand}</div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex justify-between items-end mt-3">
          <h2 className="text-xl font-bold">Product Details</h2>
          <div onClick={addProductDetail} className="cursor-pointer">
            <Image src={plus} alt="plus" width={40} height={40} />
          </div>
        </div>

        {/* PRODUCT VARAIATION ***************  */}
        {values.productDetails.map((_, index) => (
          <ProductDetailInput
            key={index}
            index={index}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            remove={removeProductDetail}
          />
        ))}

        {/* Other Info */}
        <div className="flex justify-between items-end mt-3">
          <h2 className="text-xl font-bold">Other Info</h2>
          <div onClick={addOtherInfo} className="cursor-pointer">
            <Image src={plus} alt="plus" width={40} height={40} />
          </div>
        </div>

        {/* OTHER VARAIATION ***************  */}

        {values.otherInfo.map((_, index) => (
          <OtherInfoInput
            key={index}
            index={index}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            remove={removeOtherInfo}
          />
        ))}

        {/* Image Upload */}
        <label htmlFor="upload" className="w-full">
          <input
            type="file"
            name="image"
            id="upload"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFieldValue("image", file);
              }
            }}
            className="hidden"
          />

          {values?.image ? (
            <div className="flex items-start justify-center">
              <Image
                src={
                  typeof values?.image === "string"
                    ? values?.image
                    : URL.createObjectURL(values.image)
                }
                className="w-[150px] mt-3"
                alt="Product"
                width={150}
                height={40}
              />
            </div>
          ) : (
            <div className="w-full max-w-[400px] mt-3 bg-[#FAFAFA] text-black h-[125px] flex flex-col justify-center items-center">
              <Image
                src={uploadImage}
                alt="uploadimg"
                className="w-[40px] h-[40px]"
                width={50}
                height={40}
              />
              <span className="text-gray-500 text-xl">upload image</span>
            </div>
          )}
        </label>

        {/* Status Toggle */}
        <div className="flex justify-between">
          <span className="text-gray-400 font-bold">Status</span>
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input
              type="checkbox"
              name="status"
              checked={values.status === 1}
              onChange={() =>
                setFieldValue("status", values.status === 1 ? 0 : 1)
              }
              onBlur={handleBlur}
              className="sr-only peer !border-0"
            />
            <div className="relative w-11 h-6 bg-gray-200  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 mt-6 justify-center">
          <button
            type="submit"
            className="bg-[#fcc827] font-bold cursor-pointer text-xl p-2 w-full max-w-[150px]"
          >
            {variationId ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="border border-gray-500 cursor-pointer font-bold text-xl p-2 w-full max-w-[150px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
