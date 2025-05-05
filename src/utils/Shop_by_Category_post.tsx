import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import close from "../../public/images/close.svg";
import uploadImage from "../../public/images/upload.png";
import { useFormik } from "formik";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface Category {
  No: string;
  Category_Name: string;
}

interface ShopByCategoryPostProps {
  open: boolean;
  handleClose: () => void;
  getComponents: () => void;
}

interface FormValues {
  image: File | null;
  category: string;
  offer: string;
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

export default function Shop_by_Category_post({
  open,
  handleClose,
  getComponents,
}: ShopByCategoryPostProps) {
  const [category, setCategory] = React.useState<Category[]>([]);
  const { values, handleBlur, handleSubmit, setFieldValue, handleChange } =
    useFormik<FormValues>({
      initialValues: { image: null, category: "", offer: "" },
      onSubmit: async (values) => {
        console.log(values);
        const formData = new FormData();
        if (values?.image) {
          formData.append("fk_category_id", values.category);
          formData.append("fk_section_id", "2");
          formData.append("offer", values.offer);
          formData.append("image", values.image);
        }
        const res = await apiRequest({
          method: "post",
          url: "/add_home_management",
          data: formData,
        });
        getComponents();
        toast.success(res?.data?.data?.MESSAGE);
        handleClose();
      },
    });

  const getAllCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/getcategories?pageNumber=1&pageLimit=5`,
      });

      const data = await res?.data?.data?.result;
      console.log("REs", data);
      setCategory(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="!border-none">
          <form onSubmit={handleSubmit}>
            <div className="absolute top-0 right-0 p-2">
              <button className="cursor-pointer" onClick={handleClose}>
                <Image src={close} alt="close" width={18} height={25} />
              </button>
            </div>
            <h1 className="text-center text-2xl font-bold">Add New</h1>
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
                    width={52}
                    height={52}
                    src={
                      typeof values.image === "string"
                        ? values.image
                        : URL.createObjectURL(values.image)
                    }
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

                  <span className="text-gray-500 text-xl">
                    Upload Image (250*250)
                  </span>
                </div>
              )}
            </label>

            <div className="flex flex-col space-x-5 justify-start ">
              <label className="text-gray-400 my-2.5">Select Category</label>
              <select
                className="font-bold px-3 py-2 mt-2 border border-gray-200 text-black"
                name="category"
                value={values.category || "Select"}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="Select" disabled>
                  Select
                </option>
                {category.map((item: Category, index: number) => (
                  <option key={index} value={item.No}>
                    {item.Category_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-x-5 justify-start ">
              <label className="text-gray-400 my-2.5">Offer</label>
              <input
                type="text"
                name="offer"
                placeholder="For Ex 50% Off"
                className="font-bold border-1 border-gray-200 py-2 px-3 text-black"
                value={values.offer}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="flex mt-5">
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
