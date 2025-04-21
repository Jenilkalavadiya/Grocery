import { useFormik } from "formik";
import React, { useEffect } from "react";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import plus from "../../../public/images/plus.svg";
import Image from "next/image";
import uploadImage from "../../../public/images/upload.png";
import { AddProductSchema } from "@/_components/Validation";

interface ProductDetail {
  variation: string;
  productPrice: string;
  discount: string;
  discountPrice: string;
}

const AddProducts = ({
  brand,
  category,
  subCategory,
  getProduct,
  getProductDetail,
  productId,
}: any) => {
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      category: "",
      image: null,
      subCategory: "",
      brand: "",
      title: "",
      description: "",
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
        const formData = new FormData();
        formData.append("product_name", values.name);
        formData.append(
          "product_price",
          values.productDetails[0]?.productPrice
        );
        formData.append("variation", values.productDetails[0]?.variation);
        formData.append("discount", values.productDetails[0]?.discount);
        formData.append(
          "discount_price",
          values.productDetails[0]?.discountPrice
        );
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("fk_category_id", values.category);
        formData.append("fk_subcategory_id", values.subCategory);
        formData.append("fk_brand_id", values.brand);
        formData.append("stock_status", values.status.toString());
        if (values.image && typeof values.image !== "string") {
          formData.append("image", values.image);
        }
        if (productId) {
          formData.append("id", productId);
        }

        const res = await apiRequest({
          method: "post",
          url: "/add_product",
          data: formData,
        });

        if (res?.status == 200) {
          toast.success(res?.data?.data?.MESSAGE);
          router.push("/products");
          getProduct();
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error:any) {
        console.log("Error: ", error);
        toast.error(error?.response?.data?.message);
      }
    },
  });

  useEffect(() => {
    if (getProductDetail && productId) {
      setFieldValue("name", getProductDetail?.Product_Name || "");
      setFieldValue(
        "category",
        getProductDetail?.Category_id?.toString() || ""
      );
      setFieldValue("subCategory", getProductDetail?.Subcategory_id || "");
      setFieldValue("brand", getProductDetail?.Brand_id || "");
      setFieldValue("title", getProductDetail?.Title || "");
      setFieldValue("description", getProductDetail?.Description || "");
      setFieldValue("status", getProductDetail?.Stock_Status || 0);

      if (
        getProductDetail?.Image &&
        typeof getProductDetail.Image === "string"
      ) {
        setFieldValue("image", getProductDetail.Image);
      }
    }
  }, [getProductDetail, productId, setFieldValue]);

  const addProductDetail = () => {
    const newDetails = [
      ...values.productDetails,
      {
        variation: "",
        productPrice: "",
        discount: "",
        discountPrice: "",
      },
    ];
    setFieldValue("productDetails", newDetails);
  };

  const removeProductDetail = (index: number) => {
    const updatedDetails = [...values.productDetails];
    updatedDetails.splice(index, 1);
    setFieldValue("productDetails", updatedDetails);
  };

  return (
    <div className="bg-white shadow-xl p-4 mt-4 flex items-center justify-center">
      <div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="font-bold text-xl">
            {productId ? "Edit Product" : "Add Product"}
          </h1>

          {/* Main Fields */}
          <div className="flex gap-8 flex-wrap">
            {/* Name */}
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Item Name</span>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
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
                className="w-[300px] border border-gray-400 focus:outline-none bg-white h-[50px] p-2"
              >
                <option value="">Select</option>
                {category.map((data: any) => (
                  <option key={data?.No} value={data?.No.toString()}>
                    {data.Category_Name}
                  </option>
                ))}
              </select>
              {errors.category && touched.category && (
                <div className="text-red-500">{errors.category}</div>
              )}
            </div>

            {/* SubCategory */}
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Sub Category</span>
              <select
                name="subCategory"
                value={values.subCategory}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
              >
                <option value="">Select</option>
                {subCategory.map((data: any) => (
                  <option key={data?.No} value={data?.No}>
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
                className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
              >
                <option value="">Select</option>
                {brand.map((data: any) => (
                  <option key={data?.No} value={data?.No}>
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
          <div className="flex justify-between mt-3 items-center">
            <h2 className="text-xl font-bold">Product Details</h2>
            <div onClick={addProductDetail} className="cursor-pointer">
              <Image src={plus} alt="plus" width={60} height={60} />
            </div>
          </div>

          {values.productDetails.map((_, index) => (
            <div key={index} className="flex gap-8 mt-3 flex-wrap">
              {["variation", "productPrice", "discount", "discountPrice"].map(
                (field) => (
                  <div key={field} className="flex flex-col mt-3 gap-2">
                    <span className="text-gray-400 font-bold capitalize">
                      {field}
                    </span>
                    <input
                      type="text"
                      name={`productDetails[${index}].${field}`}
                      value={(values.productDetails[index] as any)[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
                      placeholder={field}
                    />
                    {touched.productDetails?.[index]?.[field] &&
                      errors.productDetails?.[index]?.[field] && (
                        <div className="text-red-500">
                          {(errors.productDetails[index] as any)[field]}
                        </div>
                      )}
                  </div>
                )
              )}

              {values.productDetails.length > 1 && (
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeProductDetail(index)}
                    className="text-red-600 !cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Title & Description */}
          <h2 className="text-xl font-bold">Other Info</h2>
          <div className="flex gap-8 flex-wrap">
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Title</span>
              <textarea
                name="title"
                value={values.title}
                onChange={handleChange}
                cols={65}
                rows={60}
                onBlur={handleBlur}
                className="w-full border border-gray-400 p-2 h-[70px]"
              />
              {errors.title && touched.title && (
                <div className="text-red-500">{errors.title}</div>
              )}
            </div>

            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Description</span>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                cols={64}
                rows={60}
                onBlur={handleBlur}
                className="w-full border border-gray-400 p-2 h-[70px]"
              />
              {errors.description && touched.description && (
                <div className="text-red-500">{errors.description}</div>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <label htmlFor="upload" className="w-[40%] cursor-pointer">
            <input
              type="file"
              id="upload"
              name="image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFieldValue("image", file);
                }
              }}
              className="hidden"
            />
            {values.image ? (
              <img
                src={
                  typeof values.image === "string"
                    ? values.image
                    : URL.createObjectURL(values.image)
                }
                alt="Product"
                className="w-[150px] mt-3"
              />
            ) : (
              <div className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[125px] flex flex-col justify-center items-center">
                <Image src={uploadImage} alt="upload" width={40} height={40} />
                <span className="text-gray-500 text-xl">Upload Image</span>
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
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              type="submit"
              className="bg-[#fcc827] font-bold  cursor-pointer text-xl p-2 w-[150px]"
            >
              {productId ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="border border-gray-500 cursor-pointer font-bold text-xl p-2 w-[150px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
