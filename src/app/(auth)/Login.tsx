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
import logo from "../../../public/logo.png";
import email1 from "../../../public/email.png";
import pass1 from "../../../public/pass.png";
import l1 from "../../../public/l1.png";
import newl3 from "../../../public/newl3.png";

const Page = () => {
  const [eye, setEye] = useState(true);
  const router = useRouter();

  const handleClick = () => setEye(!eye);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      try {
        const res = await apiRequest({
          method: "post",
          url: "/login",
          data: trimmedValues,
        });

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
      } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err?.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }
      }
    },
  });

  // Updated to trim leading spaces and trigger validation
  const handleTrimmedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/^\s+/, ""); // Remove only leading spaces
    formik.setFieldValue(name, trimmedValue, true); // 'true' triggers validation
  };

  return (
    <div className="relative flex min-h-screen bg-[url(/background.png)] bg-cover flex-col justify-between gap-4 px-4 py-6">
      <div className={`${styles.firstImage}`}>
        <Image
          src={l2}
          width={491}
          height={314}
          className={styles.loginImage}
          alt="l2"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full z-10 my-30">
        <div
          className={`${styles.content} bg-white shadow-2xl flex flex-col items-center text-black`}
        >
          <Image
            src={logo}
            className={styles.logo}
            width={250}
            height={60}
            alt="logo"
          />
          <div className="flex mt-8 items-center justify-center">
            <Image
              src={l1}
              className={styles.login}
              width={215}
              height={115}
              alt="login"
            />
          </div>

          <div className="w-full max-w-md px-4 mt-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="mt-3">
                      <Image
                        src={email1}
                        alt="Email Icon"
                        width={16}
                        height={20}
                        className="shrink-0"
                      />
                    </div>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      type="text"
                      value={formik.values.email}
                      onChange={handleTrimmedChange}
                      onBlur={formik.handleBlur}
                      variant="standard"
                      sx={textFieldStyles}
                      fullWidth
                      autoFocus
                    />
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-600 text-sm mt-2">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="mt-3">
                      <Image
                        src={pass1}
                        alt="password"
                        width={20}
                        height={20}
                      />
                    </div>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      type={eye ? "password" : "text"}
                      value={formik.values.password}
                      onChange={handleTrimmedChange}
                      onBlur={formik.handleBlur}
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
                  {formik.errors.password && formik.touched.password && (
                    <div className="text-red-600 text-sm mt-2">
                      {formik.errors.password}
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

      <div className={`${styles.secondImage}`}>
        <Image
          src={newl3}
          width={520}
          height={350}
          className={styles.logoImage}
          alt="l3"
        />
      </div>
    </div>
  );
};

export default withoutAuth(Page);
