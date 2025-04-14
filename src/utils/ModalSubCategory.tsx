import * as React from "react";
import Box from "@mui/material/Box";
import { FaUpload } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import { AddSubCategorySchema } from "@/_components/Validation";
import uploadImage from "../../public/images/upload.png";
import close from "../../public/images/close.svg";

import Image from "next/image";
import { toast } from "react-toastify";
import { _post } from "@/api/ApiCall";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalSubCategory({
  open,
  handleClose,
  category,
  subcategory,
  getAllSubCategory,
}: any) {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: { name: "", category: "", image: null, status: 0 },
    validationSchema: AddSubCategorySchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("subcategory_name", values.name);
        formData.append("fk_category_id", values.category);
        formData.append("status", values.status.toString());
        if (values.image) {
          formData.append("image", values.image);
        }

        //POST API
        const res = await _post("/add_subcategory", formData);
        toast.success("SubCategory Added Successfully");

        getAllSubCategory();
        handleClose();
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });
  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="!flex !justify-center !items-center !px-10 !w-[465px]"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 "
            id="modal"
          >
            <h1 className="text-center font-bold text-2xl">Add SubCategory</h1>

            {/* SUBCATEGORYNAME************* */}
            <div className="absolute top-0 right-0 p-2">
              <button className="cursor-pointer" onClick={handleClose}>
                <Image src={close} alt="close" width={18} height={25} />
              </button>
            </div>
            <span className="text-gray-400 font-bold">SubCategory Name </span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-2"
              placeholder="SubCategory Name"
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}

            {/* CATEGROY********* */}

            <span className="text-gray-400 font-bold">Category</span>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400  focus:outline-none bg-white  h-[50px] p-2"
            >
              <option value="">Select</option>
              {category?.result?.map((data: any) => (
                <option key={data?.No} value={data.No}>
                  {data.Category_Name}
                </option>
              ))}
            </select>

            {errors.category && touched.category && (
              <div className="text-red-500">{errors.category}</div>
            )}

            {/* IMAGE ******* */}

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
                <div className="w-full flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(values.image)}
                    className="w-[50%] "
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
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
