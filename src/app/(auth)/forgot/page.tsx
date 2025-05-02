"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import { ForgotSchema } from "@/_components/Validation";
import { textFieldStyles } from "@/_components/textFieldStyles";
import { TextField } from "@mui/material";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import styles from "@/styles/forgot.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import l2 from "../../../../public/l2.png";
import { apiRequest } from "@/api/ApiCall";
import withoutAuth from "@/protected/withoutAuth";

const Page = () => {
  const [input, setInput] = useState({
    email: "",
  });
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: input.email,
      },
      validationSchema: ForgotSchema,
      onSubmit: async (values) => {
        try {
          const res = await apiRequest({
            method: "post",
            url: "/forgot_password",
            data: values,
          });

          console.log("Signin values", await res?.data);
          const data = await res?.data?.data;
          console.log("OTP", await data?.otp);

          setOtp(await data?.otp);
          localStorage.setItem("otp", await data?.otp);
          toast.success(res?.data?.message);
          router.push("/verifyotp");
        } catch (error: any) {
          console.log(error);
          toast.error(error?.response?.data?.message);
        }
      },
    });

  return (
    <div className="relative flex min-h-screen bg-[url(/background.png)] bg-cover flex-col justify-between gap-2 px-4 py-6">
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
      <div className="flex flex-col mt-30 items-center w-full z-10">
        <div
          className={`${styles.content} bg-white shadow-2xl flex flex-col items-center text-black`}
        >
          <div className="flex items-center  ">
            <span className="text-left relative right-[112px]">
              <Link href="/" className="cursor-pointer">
                <FaArrowLeftLong />
              </Link>
            </span>
            <h2 className="font-bold text-xl text-center w-[100%]">
              Forgot Password?
            </h2>
          </div>
          <p className="text-sm text-center text-gray-500 mt-4">
            Don't worry! It happens. Please enter the address <br />
            associated with your account.
          </p>
          <div className="flex mt-8 items-center justify-center">
            <Image
              src="/forgot.png"
              className={`${styles.forgotImage}`}
              width={115}
              height={115}
              alt="forgot"
            />
          </div>

          <div className="w-full max-w-md px-4 mt-12">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="mt-3">
                      <Image
                        src="/email.png"
                        alt="Email Icon"
                        width={16}
                        height={20}
                        className="shrink-0"
                      />
                    </div>
                    <TextField
                      id="email"
                      type="email"
                      onChange={handleChange}
                      name="email"
                      onBlur={handleBlur}
                      value={values.email}
                      label="Email"
                      variant="standard"
                      sx={textFieldStyles}
                      fullWidth
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.email}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full p-3 font-bold bg-[#FCC827] hover:bg-[#ecdb76] duration-200"
                >
                  Submit
                </button>
                <div className="text-center">
                  <Link href="/">Login Now</Link>
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

export default withoutAuth(Page);
