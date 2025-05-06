"use client";
import { Box, Modal } from "@mui/material";
import Image from "next/image";
import close from "../../public/images/close.svg";
import { useState } from "react";
import { useFormik } from "formik";
import { ResetPassword } from "@/_components/Validation";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
import password from "../../public/images/password.svg";

interface ModalResetPasswordProps {
  boxOpen: boolean;
  handleClose: () => void;
}

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const ModalResetPassword = ({
  boxOpen,
  handleClose,
}: ModalResetPasswordProps) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ResetPassword,
    onSubmit: async (values) => {
      const params = {
        old_password: values.oldPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
        id: 1,
      };

      try {
        const res = await apiRequest({
          method: "post",
          url: "/change_password",
          data: params,
        });

        if (res?.status === 200) {
          toast.success(res?.data?.data?.MESSAGE);
        } else if (res?.status === 501) {
          toast.error(res?.data?.message);
        }
      } catch (error: unknown) {
        const apiError = error as ApiError;
        console.error("Error while submitting Reset Password:", error);
        toast.error(apiError?.response?.data?.message || "An error occurred");
      }
    },
  });

  return (
    <div>
      <Modal
        open={boxOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={style}
          className="!flex !justify-center !border-none !items-center"
        >
          <form onSubmit={formik.handleSubmit}>
            <h2 className="!font-bold !text-center !mb-3 !text-2xl">
              Change Password
            </h2>

            <div className="absolute top-0 right-0 p-2">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer"
              >
                <Image src={close} alt="close" width={18} height={25} />
              </button>
            </div>

            {/* Old Password */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-400 font-bold">Old Password</label>
              <div className="relative">
                {/* Place the image here, with absolute positioning */}
                <Image
                  src={password}
                  width={20}
                  height={20}
                  alt="password"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="text"
                  name="oldPassword"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-[320px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] pl-10 p-4" // Adjust padding-left
                  placeholder="Old Password"
                />
              </div>
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <span className="text-red-500 text-sm">
                  {formik.errors.oldPassword}
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-400 font-bold">New Password</label>
              <div className="relative">
                {/* Password Image */}
                <Image
                  src={password}
                  width={20}
                  height={20}
                  alt="password"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-[320px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] pl-10 p-4" // Adjust padding-left
                  placeholder="New Password"
                />
                <button
                  type="button"
                  className="absolute cursor-pointer top-4 right-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <IoEye /> : <IoMdEyeOff />}
                </button>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {formik.errors.newPassword}
                </span>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-400 font-bold">
                Confirm New Password
              </label>
              <div className="relative">
                {/* Password Image */}
                <Image
                  src={password}
                  width={20}
                  height={20}
                  alt="password"
                  className="absolute left-3  top-1/2 transform -translate-y-1/2"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-[320px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] pl-10 p-4" // Adjust padding-left
                  placeholder="Confirm New Password"
                />
                <button
                  type="button"
                  className="absolute top-4 cursor-pointer right-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoEye /> : <IoMdEyeOff />}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>

            <div className="flex mb-2 justify-center items-center mt-3">
              <button
                type="submit"
                className="w-full font-bold !cursor-pointer bg-amber-300 p-3"
              >
                Update Password
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalResetPassword;
