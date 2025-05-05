import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { AddBrandSchema } from "@/_components/Validation";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
import close from "../../public/images/close.svg";
import uploadImage from "../../public/images/upload.png";
import Image from "next/image";
import { useEffect } from "react";

interface Category {
  No: number;
  Category_Name: string;
}

interface SubCategory {
  No: number;
  SubCategory_Name: string;
}

interface BrandFormValues {
  name: string;
  category: string;
  subCategory: string;
  image: File | string | null;
  status: number;
}

interface ModalBrandProps {
  open: boolean;
  handleClose: () => void;
  category: Category[];
  subCategory: SubCategory[];
  getbrands: () => void;
  id?: string | number;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalBrand({
  open,
  handleClose,
  category,
  subCategory,
  getbrands,
  id,
}: ModalBrandProps) {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<BrandFormValues>({
    initialValues: {
      name: "",
      category: "",
      subCategory: "",
      image: null,
      status: 0,
    },

    validationSchema: AddBrandSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const formData = new FormData();
        formData.append("brand_name", values.name);
        formData.append("fk_category_id", values.category);
        formData.append("fk_subcategory_id", values.subCategory);
        formData.append("status", values.status.toString());

        if (values.image instanceof File) {
          formData.append("image", values.image);
        } else if (typeof values.image === "string") {
          formData.append("image", values.image);
        }

        if (id) {
          formData.append("id", id.toString());
        }

        const res = await apiRequest({
          method: "post",
          url: "/add_brand",
          data: formData,
        });
        toast.success(
          id ? "Brand Updated Successfully" : "Brand Added Successfully"
        );
        console.log("Response: ", res);
        handleClose();
        getbrands();
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });

  const getBrandById = async () => {
    const res = await apiRequest({ method: "get", url: `/get_brand?id=${id}` });

    console.log("res12", res?.data);
    const result = res?.data?.data?.DATA;
    setFieldValue("name", result.Brand_Name || "");
    setFieldValue("category", result.Category_id || "");
    setFieldValue("subCategory", result.SubCategory_id || "");
    setFieldValue("status", result?.Status || 0);

    if (result?.Image && typeof result.Image === "string") {
      setFieldValue("image", result.Image);
    }
  };

  useEffect(() => {
    if (id) {
      getBrandById();
    }
  }, [id, setFieldValue]);

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box
          sx={style}
          className="!flex !justify-center !border-none !items-center !px-10 !w-[465px]"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 "
            id="modal"
          >
            <h1 className="text-center font-bold text-2xl">
              {id ? "Update Brand" : "Add Brand"}
            </h1>

            <div className="absolute top-0 right-0 p-2">
              <button className="cursor-pointer" onClick={handleClose}>
                <Image src={close} alt="close" width={18} height={25} />
              </button>
            </div>
            <span className="text-gray-400 font-bold">Brand Name </span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
              placeholder="Brand Name"
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}

            <span className="text-gray-400 font-bold">Category</span>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400  focus:outline-none bg-white  h-[50px] p-2"
            >
              <option value="">Select</option>
              {category?.map((data: Category) => (
                <option key={data?.No} value={data?.No}>
                  {data?.Category_Name}
                </option>
              ))}
            </select>

            {errors.category && touched.category && (
              <div className="text-red-500">{errors.category}</div>
            )}

            <span className="text-gray-400 font-bold">Sub Category</span>
            <select
              name="subCategory"
              value={values.subCategory}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
            >
              <option value="">Select</option>

              {subCategory?.map((data: SubCategory) => (
                <option key={data?.No} value={data?.No}>
                  {data?.SubCategory_Name}
                </option>
              ))}
            </select>
            {errors.subCategory && touched.subCategory && (
              <div className="text-red-500">{errors.subCategory}</div>
            )}

            {/* IMAGE ******* */}

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

              {values.image ? (
                <div className=" flex items-start justify-center">
                  <Image
                    src={
                      typeof values.image === "string"
                        ? values.image
                        : URL.createObjectURL(values.image)
                    }
                    className="w-[40%]"
                    width={80}
                    height={20}
                    alt="Product"
                  />
                </div>
              ) : (
                <div className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[125px] flex flex-col justify-center items-center">
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

            {errors.image && touched.image && (
              <div className="text-red-500">{errors.image}</div>
            )}

            {/* SWITCH  */}
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

            <div className="flex mb-3">
              <button type="submit" className="w-[350px] bg-amber-300 p-3">
                {id ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
