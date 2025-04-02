// pages/login.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import { LoginSchema } from "@/_components/Validation";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import { textFieldStyles } from "@/_components/textFieldStyles";
import styles from "@/styles/login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Page = () => {
  const [eye, setEye] = useState(true);

  // SEE PASSWORD
  const handleClick = () => {
    setEye(!eye);
  };

  // FOR INPUT TEXT
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter()
  // Formik hook
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: input.email,
        password: input.password,
      },
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        try {
          const res = await axios.post(
            "http://192.168.2.181:3000/admin/login",
            values,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          // console.log("Signin values", await res.data);
          toast.success(res?.data?.data?.msg);
          const data = await res?.data?.data;
          console.log("data", data);
          localStorage.setItem("loginuser", JSON.stringify(data?.email));
          localStorage.setItem("userName", JSON.stringify(data?.name));
          localStorage.setItem("loginjwt", data?.token);
          // toast.error(res?.data?.message);

            // router.push('/dashboard')
          

        } catch (error) {
          console.log("error", error);
          toast.error(error?.message);
        }
      },
    });

  return (
    <div className="flex min-h-screen bg-[url(/background.png)] bg-cover flex-col justify-between gap-4 px-4 py-6">
      {/* FIRST IMAGE */}
      <div className="firstimage ">
        <Image
          src="/l2.png"
          width={491}
          className={`w-[50%] absolute bottom-0 left-0 sm:w-[40%] md:w-[35%] lg:w-[33%] ${styles.loginImage}`}
          height={314}
          alt="l2"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center w-full">
        <div
          className={`flex bg-white shadow-2xl py-10 flex-col items-center text-black w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[33%] 2xl:w-[30%] ${styles.content}`}
        >
          <Image
            src="/logo.png"
            className={` ${styles.logo} lg:w-[40%] md:w-[30%]`}
            width={250}
            height={60}
            alt="logo"
          />

          <div className="logo flex mt-8 items-center justify-center">
            <Image
              src="/l1.png"
              className={` ${styles.login}   md:w-[40%] lg:w-[40%]`}
              width={215}
              height={115}
              alt="login"
            />
          </div>

          <div className="div mt-12 w-full max-w-md px-4">
            <form action="" onSubmit={handleSubmit}>
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
                      className="w-full"
                      variant="standard"
                      sx={textFieldStyles}
                      fullWidth
                    />
                  </div>
                  <div className="mt-2">
                    {errors.email && touched.email && (
                      <div className="text-red-600 text-sm">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="mt-3">
                      <span>
                        <Image
                          src="/pass.png"
                          alt="email"
                          width={20}
                          height={20}
                        />
                      </span>
                    </div>
                    <TextField
                      id="standard-basic"
                      type={eye ? "password" : "text"}
                      onChange={handleChange}
                      name="password"
                      onBlur={handleBlur}
                      value={values.password}
                      label="Password"
                      className="w-full"
                      variant="standard"
                      sx={textFieldStyles}
                      fullWidth
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
                    />
                  </div>
                  <div className="mt-2">
                    {errors.password && touched.password && (
                      <div className="text-red-600 text-sm">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="button mt-3">
                  <button className="cursor-pointer w-full p-3 duration-200 hover:bg-[#ecdb76] font-bold bg-[#FCC827]">
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

      {/* SECOND IMAGE */}
      <div className="secondimage ">
        <Image
          src="/newl3.png"
          width={520}
          className={`w-[50%] absolute bottom-0 right-0 sm:w-[40%] md:w-[35%] lg:w-[35%] ${styles.logoImage}`}
          height={350}
          alt="l3"
        />
      </div>
    </div>
  );
};

export default Page;
