import { AddProductSchema } from "@/_components/Validation";
import { useFormik } from "formik";
import Image from "next/image";
import React from "react";
import uploadImage from "../../../public/images/upload.png";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddProducts = ({ brand, category, subCategory, getProduct }: any) => {
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
      variation: "",
      productPrice: "",
      discount: "",
      discountPrice: "",
      title: "",
      description: "",
      status: 0,
    },
    validationSchema: AddProductSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("product_name", values.name);
        formData.append("product_price", values.productPrice);
        formData.append("variation", values.variation);
        formData.append("discount", values.discount);
        formData.append("discount_price", values.discountPrice);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("fk_category_id", values.category);
        formData.append("fk_subcategory_id", values.subCategory);
        formData.append("fk_brand_id", values.brand);
        formData.append("stock_status", values.status.toString());
        if (values.image) {
          formData.append("image", values.image);
        }
        console.log("values", values);

        //POST API
        const res = await apiRequest({
          method: "post",
          url: "/add_product",
          data: formData,
        });

        if (res?.status == 200) {
          toast.success("Product Added Successfully");
          getProduct();
        }

        console.log("Response: ", res);
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });

  const router = useRouter();
  return (
    <div className="bg-white shadow-xl p-4 mt-4 flex items-center justify-center">
      <div className="">
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* ADD PRODUCT ************ */}
          <h1 className="font-bold text-xl">Add Product</h1>
          <div className="flex gap-8">
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Item Name </span>
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

            {/* CATEGORY **************** */}
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Category</span>
              <select
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] border border-gray-400  focus:outline-none bg-white  h-[50px] p-2"
              >
                <option value="">Select</option>
                {category.map((data: any) => (
                  <option key={data?.No} value={data.No}>
                    {data.Category_Name}
                  </option>
                ))}
              </select>
              {errors.category && touched.category && (
                <div className="text-red-500">{errors.category}</div>
              )}
            </div>

            {/* SUBCATEGORY********  */}
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

                {subCategory?.map((data: any) => (
                  <option key={data?.No} value={data?.No}>
                    {data?.SubCategory_Name}
                  </option>
                ))}
              </select>
              {errors.subCategory && touched.subCategory && (
                <div className="text-red-500">{errors.subCategory}</div>
              )}
            </div>

            {/* BRAND****** */}
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

                {brand?.map((data: any) => (
                  <option key={data?.No} value={data?.No}>
                    {data?.Brand_Name}
                  </option>
                ))}
              </select>
              {errors.brand && touched.brand && (
                <div className="text-red-500">{errors.brand}</div>
              )}
            </div>
          </div>

          {/* PRODUCT DETAILS ****** */}

          <h2 className="text-xl font-bold mt-3">Product Details</h2>
          <div className="flex gap-8">
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Variation </span>
              <input
                type="text"
                name="variation"
                value={values.variation}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
                placeholder="product qty (ex.500g,1kg)"
              />
              {errors.variation && touched.variation && (
                <div className="text-red-500">{errors.variation}</div>
              )}
            </div>

            {/* CATEGORY **************** */}
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Product Price </span>
              <input
                type="text"
                name="productPrice"
                value={values.productPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
                placeholder="Price"
              />
              {errors.productPrice && touched.productPrice && (
                <div className="text-red-500">{errors.productPrice}</div>
              )}
            </div>

            {/* SUBCATEGORY********  */}
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Discount(%) </span>
              <input
                type="text"
                name="discount"
                value={values.discount}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
                placeholder="Discount"
              />
              {errors.discount && touched.discount && (
                <div className="text-red-500">{errors.discount}</div>
              )}
            </div>

            {/* BRAND****** */}
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Discount Price </span>
              <input
                type="text"
                name="discountPrice"
                value={values.discountPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
                placeholder="Price"
              />
              {errors.discountPrice && touched.discountPrice && (
                <div className="text-red-500">{errors.discountPrice}</div>
              )}
            </div>
          </div>

          {/* OTHER INFO ********** */}
          <h2 className="text-xl font-bold mt-3">Other Info</h2>
          <div className="flex gap-8">
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Title Name </span>
              <textarea
                name="title"
                value={values.title}
                onChange={handleChange}
                cols={65}
                rows={50}
                onBlur={handleBlur}
                className=" border border-gray-400 focus:outline-none bg-white text-black h-[70px] p-2"
                placeholder="Title"
              />
            </div>

            {/* Description **************** */}
            <div className="flex flex-col mt-3 gap-2">
              <span className="text-gray-400 font-bold">Description </span>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={50}
                cols={65}
                className=" border border-gray-400 focus:outline-none bg-white text-black h-[70px] p-2"
                placeholder="Description"
              />
            </div>
          </div>

          {/* IMAGE************ */}

          <div>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFieldValue("image", file);
                }
              }}
              onBlur={handleBlur}
              className="hidden"
              id="upload"
              placeholder="Upload image"
            />
            <label htmlFor="upload">
              {values.image ? (
                <div className="w-[50%] flex items-start justify-start">
                  <img
                    src={URL.createObjectURL(values.image)}
                    className="w-[20%] "
                    alt="alt"
                  />
                </div>
              ) : (
                <div className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[125px] flex flex-col justify-center items-center">
                  <Image
                    src={uploadImage}
                    alt="uploadimg"
                    className="w-[40px] h-[40px]"
                  />

                  <span className="text-gray-500 text-xl">upload image</span>
                </div>
              )}
            </label>

            {errors.image && touched.image && (
              <div className="text-red-500">{errors.image}</div>
            )}
          </div>

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

          {/* SUBMIT************ */}
          <div className="flex items-center mt-3 justify-center gap-2">
            <div>
              <button
                type="submit"
                className="bg-[#fcc827] cursor-pointer font-bold text-xl p-2 w-[150px] "
              >
                Save
              </button>
            </div>
            <div>
              <button
                onClick={() => router.push("/products")}
                className="font-bold text-xl p-2 w-[150px] cursor-pointer border-gray-500 border"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
