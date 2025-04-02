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
const page = () => {
  //FOR INPUT TEXT*****************
  const [input, setInput] = useState({
    email: "",
  });

  // Formik hook*************
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: input.email,
      },
      validationSchema: ForgotSchema,
      onSubmit: async (values) => {
        try {
          const res = await axios.post(
            "http://192.168.2.181:3000/admin/forgot_password",
            values,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          console.log("Signin values", await res.data);
          // toast.success(res?.data?.data);
        } catch (error) {
          console.log(error);
          // toast.error(error.response.data.status);
        }
      },
    });

  return (
    <div className="flex h-screen bg-[url(/background.png)] bg-cover flex-col justify-between gap-2">
      <div className="firstimage">
        <Image
          src="/l2.png"
          width={491}
          className="absolute w-[32%] bottom-0 left-0 sm:w-[40%] md:w-[45%] lg:w-[33%]"
          height={314}
          alt="l2"
        />
      </div>

      {/* MAIN CONTENT ****************** */}

      <div className="content flex mt-5 flex-col items-center w-full">
        <div className="flex bg-white shadow-2xl py-10 flex-col items-center text-black w-[90%] sm:w-[80%]  md:w-[50%] lg:w-[33%] xl:w-[30%]">
          <div className=" flex items-start justify-start w-[90%] ">
            <span className="">
              <Link href="/login" className="cursor-pointer ">
                {" "}
                <FaArrowLeftLong />
              </Link>
            </span>
          </div>
          <h2 className="font-bold text-xl ">Forgot Password?</h2>
          <p className="text-sm text-center  text-gray-500 mt-4">
            Don't worry! It happens.Please Enter address <br />
            associated with your account.
          </p>
          <div className="logo lg:flex mt-8 lg:items-center md:flex  md:items-center">
            <Image
              src="/forgot.png"
              className="lg:w-[100%] md:w-[80%] "
              width={115}
              height={115}
              alt="login"
            />
          </div>

          <div className="div mt-12">
            <form action="" onSubmit={handleSubmit}>
              <div className="lg:flex lg:flex-col md:flex md:flex-col gap-8">
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
                      className="w-full"
                      variant="standard"
                      sx={textFieldStyles}
                      fullWidth
                    />
                  </div>
                  <div className="mt-2">
                    {errors.email && touched.email && (
                      <div className="error  text-red-950 text-sm">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="button ">
                  <button className="cursor-pointer w-full sm:w-[335px] p-3 hover:bg-[#ecdb76] font-bold bg-[#FCC827]">
                    Submit
                  </button>
                </div>
                <div className="forget text-center ">
                  <Link href="/" className="text-center">
                    Login Now
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SECOND IMAGE ************** */}
      <div className="secondimage">
        <Image
          src="/newl3.png"
          width={520}
          className="absolute w-[35%] bottom-0 right-0 sm:w-[40%] md:w-[45%] lg:w-[35%]"
          height={350}
          alt="l3"
        />
      </div>
    </div>
  );
};

export default page;
