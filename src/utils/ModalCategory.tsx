"use client";

import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { AddCategorySchema } from "@/_components/Validation";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
import Image from "next/image";
import uploadImage from "../../public/images/upload.png";
import close from "../../public/images/close.svg";

interface FormValues {
  name: string;
  image: File | string | null;
  status: number;
}

interface ModalCategoryProps {
  open: boolean;
  handleClose: () => void;
  getAllCategory: () => Promise<void>;
  itemID: number | string;
}

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

export default function ModalCategory({
  open,
  handleClose,
  getAllCategory,
  itemID,
}: ModalCategoryProps) {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: { name: "", image: null, status: 0 },
    validationSchema: AddCategorySchema,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("category_name", values.name);
      formData.append("status", values.status.toString());
      if (values.image) {
        formData.append("image", values.image);
      }
      if (itemID) {
        formData.append("id", itemID.toString());
      }
      const res = await apiRequest({
        method: "post",
        url: "/addcategory",
        data: formData,
      });

      console.log("Response", res);
      toast.success(res?.data?.data?.MESSAGE);
      handleClose();
      getAllCategory();
    },
  });

  const getCategoryByID = async () => {
    const res = await apiRequest({
      method: "get",
      url: `/getcategory?id=${itemID}`,
    });

    console.log("res", res);
    const result = res.data.data.DATA;
    setFieldValue("name", result.category);

    if (result?.image && typeof result.image === "string") {
      setFieldValue("image", result.image);
    }
    setFieldValue("status", result.status);
  };
  useEffect(() => {
    if (itemID) {
      getCategoryByID();
    }
  }, [itemID]);

  return (
    <div className="">
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
        disableEscapeKeyDown
      >
        <Box
          sx={style}
          className="!flex !justify-center !border-none !items-center  !w-[440px]"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 "
            id="modal"
          >
            <h1 className="text-center font-bold text-2xl">
              {itemID ? "Edit Category" : "Add Category"}
            </h1>

            {/* CATEGORYNAME************* */}
            <div className="absolute top-0 right-0 p-2">
              <button className="cursor-pointer" onClick={handleClose}>
                <Image src={close} alt="close" width={18} height={25} />
              </button>
            </div>
            <span className="text-gray-400 font-bold">Category</span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-4"
              placeholder="Category"
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
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
                  <Image
                    src={
                      typeof values.image === "string"
                        ? values.image
                        : URL.createObjectURL(values.image)
                    }
                    className="w-[50%]"
                    alt="alt"
                    width={250}
                    height={250}
                  />
                </div>
              ) : (
                <div className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[125px] flex flex-col justify-center items-center">
                  <Image
                    src={uploadImage}
                    alt="uploadimg"
                    className="w-[40px] h-[40px]"
                  />

                  <span className="text-gray-500 text-xl">
                    Upload Image (250*250)
                  </span>
                </div>
              )}
            </label>

            {errors.image && touched.image && (
              <div className="text-red-500">{errors.image}</div>
            )}

            {/* SWITCH  */}
            <div className="flex justify-between mt-3">
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
                <div className="relative w-11 h-6 bg-gray-200  dark:peer-focus:ring-green-800 rounded-full  dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-600 "></div>
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
