"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import { LoginSchema } from "@/_components/Validation";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { textFieldStyles } from "@/_components/textFieldStyles";
import styles from "@/styles/login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const [eye, setEye] = useState(true);
  const router = useRouter();

  const handleClick = () => setEye(!eye);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        try {
          const res = await axios.post(
            "http://192.168.2.181:3000/admin/login",
            values,
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          );
          toast.success(res?.data?.data?.msg);
          const data = res?.data?.data;
          localStorage.setItem("loginuser", JSON.stringify(data?.email));
          localStorage.setItem("userName", JSON.stringify(data?.name));
          localStorage.setItem("loginjwt", data?.token);
          localStorage.setItem("refreshjwt", data?.refreshtoken);

          router.push("/dashboard");
        } catch (error) {
          console.log("error", error);
          toast.error(error?.message);
        }
      },
    });

  return (
    <div className="relative flex min-h-screen bg-[url(/background.png)] bg-cover flex-col justify-between gap-4 px-4 py-6">
      {/* FIRST IMAGE */}
      <div className={`${styles.firstImage}`}>
        <Image
          src="/l2.png"
          width={491}
          height={314}
          className={`${styles.loginImage}`}
          alt="l2"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center w-full z-10">
        <div
          className={`${styles.content} bg-white shadow-2xl flex flex-col items-center text-black`}
        >
          <Image
            src="/logo.png"
            className={`${styles.logo}`}
            width={250}
            height={60}
            alt="logo"
          />
          <div className="flex mt-8 items-center justify-center">
            <Image
              src="/l1.png"
              className={`${styles.login}`}
              width={215}
              height={115}
              alt="login"
            />
          </div>

          <div className="w-full max-w-md px-4 mt-12">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/email.png"
                      alt="Email Icon"
                      width={16}
                      height={20}
                    />
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

                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/pass.png"
                      alt="Password Icon"
                      width={20}
                      height={20}
                    />
                    <TextField
                      id="password"
                      type={eye ? "password" : "text"}
                      onChange={handleChange}
                      name="password"
                      onBlur={handleBlur}
                      value={values.password}
                      label="Password"
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
                  {errors.password && touched.password && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer p-3 font-bold bg-[#FCC827] hover:bg-[#ecdb76] duration-200"
                >
                  Login
                </button>
                <div className="text-center mt-4">
                  <Link href="/forgot">Forgot Password?</Link>
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

export default Page;
