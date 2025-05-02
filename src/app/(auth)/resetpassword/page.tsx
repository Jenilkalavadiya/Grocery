"use client";

import Image from "next/image";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "@/_components/Validation";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { textFieldStyles } from "@/_components/textFieldStyles";
import styles from "@/styles/login.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import l2 from "../../../../public/l2.png";
import { apiRequest } from "@/api/ApiCall";
import withoutAuth from "@/protected/withoutAuth";

const ResetPassword = () => {
  const [eye, setEye] = useState(true);
  const router = useRouter();
  const handleClick = () => setEye(!eye);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { password: "", confirmPassword: "" },
      validationSchema: ResetPasswordSchema,
      onSubmit: async (values) => {
        try {
          const res = await apiRequest({
            method: "post",
            url: "/reset-password",
            data: values,
          });

          if (res?.status === 200) {
            toast.success(res?.data?.data);
            router.push("/");
          } else {
            toast.error("their is something error");
          }

          console.log("resetPassword", res);
        } catch (error:any) {
          console.log("error", error);
          toast.error(error?.response?.data?.message);
        }
      },
    });

  return (
    <div className="relative flex min-h-screen bg-[url(/background.png)] bg-cover flex-col justify-between gap-4 px-4 py-6">
      {/* FIRST IMAGE */}
      <div className={`${styles.firstImage}`}>
        <Image
          src={l2}
          width={491}
          height={314}
          className={`${styles.loginImage}`}
          alt="l2"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col mt-32 items-center w-full z-10">
        <div
          className={`${styles.content} bg-white shadow-2xl flex flex-col items-center text-black`}
        >
          <h2 className="font-bold text-2xl ">Reset Password</h2>

          <div className="w-full max-w-md px-4 mt-12">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex items-center  gap-2">
                    <div className="mt-3">
                      <span>
                        <Image
                          src="/pass.png"
                          alt="password"
                          width={20}
                          height={20}
                        />
                      </span>
                    </div>
                    <TextField
                      id="password"
                      className="mt-3"
                      type={eye ? "password" : "text"}
                      onChange={handleChange}
                      name="password"
                      onBlur={handleBlur}
                      value={values.password}
                      label="New Password"
                      variant="standard"
                      sx={textFieldStyles}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClick} edge="end">
                                {eye ? <IoMdEyeOff /> : <IoEye />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      fullWidth
                    />
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="mt-3">
                      <span>
                        <Image
                          src="/pass.png"
                          alt="password"
                          width={20}
                          height={20}
                        />
                      </span>
                    </div>
                    <TextField
                      id="confirmPassword"
                      type="password"
                      onChange={handleChange}
                      name="confirmPassword"
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      label="Confirm Password"
                      variant="standard"
                      sx={textFieldStyles}
                      fullWidth
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer p-3 font-bold bg-[#FCC827] hover:bg-[#ecdb76] duration-200"
                >
                  Reset Password
                </button>
                <div className="text-center ">
                  <Link href="/">Login</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SECOND IMAGE */}
      <div className={`${styles.secondImage}`}>
        <Image
          src="/newl3.png"
          width={520}
          height={350}
          className={`${styles.logoImage}`}
          alt="l3"
        />
      </div>
    </div>
  );
};

export default withoutAuth(ResetPassword);
