import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import close from "../../../public/images/close.svg";
import uploadImage from "../../../public/images/upload.png";
import { useFormik } from "formik";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
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
const Advertise_add_Modal = ({ open, handleClose, getComponents }: any) => {
  const { values, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: { image: null },
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      if (values?.image) {
        formData.append("image", values.image);
        formData.append("fk_section_id", "4");
      }
      const res = await apiRequest({
        method: "post",
        url: "/add_home_management",
        data: formData,
      });
      console.log("Response", res);
      getComponents();
      toast.success(res?.data?.data?.MESSAGE);
      handleClose();
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
        <Box sx={style} className="!border-none">
          <form onSubmit={handleSubmit}>
            <div className="absolute top-0 right-0 p-2">
              <button className="cursor-pointer" onClick={handleClose}>
                <Image src={close} alt="close" width={18} height={25} />
              </button>
            </div>
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
};

export default Advertise_add_Modal;
