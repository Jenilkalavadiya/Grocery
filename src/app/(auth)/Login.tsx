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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/api/ApiCall";
import l2 from "../../../public/l2.png";
import withoutAuth from "@/protected/withoutAuth";

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
          const res = await apiRequest({
            method: "post",
            url: "/login",
            data: values,
          });

          console.log("res", res);

          if (res?.status === 200) {
            toast.success(res?.data?.data?.msg);
            const data = res?.data?.data;
            localStorage.setItem("loginuser", JSON.stringify(data?.email));
            localStorage.setItem("userName", JSON.stringify(data?.name));
            localStorage.setItem("auth_token", data?.token);
            localStorage.setItem("refresh_token", data?.refresh_token);

            router.push("/dashboard");
          } else {
            toast.error(res?.data?.message);
          }
        } catch (error: any) {
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
      <div className="flex flex-col items-center justify-center w-full z-10 my-30">
        <div
          className={`${styles.content} bg-white shadow-2xl flex flex-col items-center  text-black`}
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
                      autoFocus
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

export default withoutAuth(Page);
