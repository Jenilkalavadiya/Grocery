import * as React from "react";
import Box from "@mui/material/Box";
import { FaUpload } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { AddCategorySchema } from "@/_components/Validation";
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

export default function ModalCategory({ open, handleClose }: any) {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: { name: "", image: null, status: false },
    validationSchema: AddCategorySchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            id="modal "
          >
            <h1 className="text-center font-bold text-2xl">Add Category</h1>
            <span>Category Name :</span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] bg-white text-black h-[50px] p-2"
              placeholder="Category Name"
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}

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
              className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[125px] hidden"
              id="upload"
              placeholder="Upload image"
            />
            <label htmlFor="upload">
              <div className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[125px]">
                <FaUpload />
              </div>
            </label>

            {errors.image && touched.image && (
              <div className="text-red-500">{errors.image}</div>
            )}

            <div className="flex justify-between">
              <span>Status</span>
              <label className="inline-flex items-center mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  checked={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="sr-only peer !border-0"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex">
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
