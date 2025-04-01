"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoginSchema } from "@/_components/Validation";
import "@/styles/login.module.css";
import { TextField } from "@mui/material";

const page = () => {
  const [eye, setEye] = useState(true);

  // SEE PASSWORD**********************
  const handleClick = () => {
    setEye(!eye);
  };

  //FOR INPUT TEXT*****************
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // Formik hook*************
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: input.email,
        password: input.password,
      },
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        console.log("Signin values", values);
      },
    });

  return (
    <div className="lg:flex lg:h-screen bg-[url(/background.png)] bg-cover lg:flex-col justify-between gap-2">
      <div className="firstimage ">
        <Image
          src="/l2.png"
          width={491}
          className="lg:absolute  w-[32%] lg:bottom-0 lg:left-0 sm:w-[50%] md:w-[45%] lg:w-[33%]"
          height={314}
          alt="l2"
        />
      </div>

      {/* MAIN CONTENT ****************** */}

      <div className="content flex mt-5 flex-col items-center w-full">
        <div className=" content flex bg-white shadow-2xl py-10 flex-col items-center text-black w-[90%] sm:w-[60%]  md:w-[50%] lg:w-[33%] xl:w-[30%]">
          <Image
            src="/logo.png"
            className="lg:w-[35%] md:w-[30%]"
            width={203}
            height={60}
            alt="logo"
          />

          <div className="logo lg:flex mt-8 lg:items-center md:flex  md:items-center">
            <Image
              src="/l1.png"
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
                  <div className=" lg:w-[100%]  flex items-center   gap-2">
                    <span>
                      <Image
                        src="/email.png"
                        alt="email"
                        width={15}
                        height={20}
                      />
                    </span>

                    <div className="mb-4 ">
                      <TextField
                        id="standard-basic"
                        type="email"
                        
                        onChange={handleChange}
                        name="email"
                        onBlur={handleBlur}
                        value={values.email}
                        label="Email"
                        className="w-[100%]"
                        sx={{
                            
                            // Label
                            "& .MuiInputLabel-standard": {
                              color: "#ecdb76",
                              fontWeight: "bold",
                            },
                          }}
                        variant="standard"
                      />
                    </div>
                  </div>

                  {/* *******error********** */}
                  <div className="mt-2">
                    {errors.email && touched.email && (
                      <div className="error  text-red-600 text-sm">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className=" border-b-gray-200 flex items-center gap-2">
                    <span>
                      <Image
                        src="/pass.png"
                        alt="email"
                        width={20}
                        height={20}
                      />
                    </span>
                    <div className="mb-4">
                      {eye ? (
                        <TextField
                          id="standard-basic"
                          type="password"
                          onChange={handleChange}
                          name="email"
                          onBlur={handleBlur}
                          value={values.password}
                          label="Password"
                          className="w-[100%]"
                          variant="standard"
                        />
                      ) : (
                        <TextField
                          id="standard-basic"
                          type="text"
                          onChange={handleChange}
                          name="email"
                          onBlur={handleBlur}
                          value={values.password}
                          label="Password"
                          className="w-[100%]"
                          variant="standard"
                        />
                      )}
                    </div>
                    <span onClick={handleClick} className="ml-5 cursor-pointer">
                      {eye ? <IoMdEyeOff /> : <IoEye />}
                    </span>
                  </div>
                  <div className="mt-2">
                    {errors.password && touched.password && (
                      <div className="error text-red-600 text-sm">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>
                <div className="button mt-3">
                  <button className="cursor-pointer w-full sm:w-[335px] p-3 hover:bg-[#ecdb76] font-bold bg-[#FCC827]">
                    Login
                  </button>
                </div>
                <div className="forget text-center mt-4">
                  <Link href="/forgot" className="text-center">
                    Forgot Password?
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
          className="lg:absolute w-[35%] lg:bottom-0 lg:right-0 sm:w-[50%]  md:w-[45%] lg:w-[35%]"
          height={350}
          alt="l3"
        />
      </div>
    </div>
  );
};

export default page;
