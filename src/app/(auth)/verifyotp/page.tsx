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
import styles from "@/styles/login.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import OtpInput from "react-otp-input";
const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("please enter otp");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.2.181:3000/admin/otp-verify",
        new URLSearchParams({ otp }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("first", await response.data);

      if (response?.data?.code === 1) {
        toast.success("OTP verified successfully!");
        //   router.push("/resetpassword");
      } else {
        toast.error(response?.data?.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-[url(/background.png)] bg-cover flex-col justify-between gap-2">
      <div className="firstimage">
        <Image
          src="/l2.png"
          width={491}
          className={` ${styles.loginImage} absolute w-[32%] bottom-0 left-0 sm:w-[40%] md:w-[45%] lg:w-[33%]`}
          height={314}
          alt="l2"
        />
      </div>

      <div className="content flex mt-5 flex-col items-center w-full">
        <div
          className={`flex ${styles.content} bg-white shadow-2xl py-10 flex-col items-center text-black w-[90%] sm:w-[80%]  md:w-[50%] lg:w-[33%] xl:w-[30%]`}
        >
          <div className=" flex items-start justify-start w-[90%] ">
            <div className="flex items-center ">
              <span className="">
                <Link href="/forgot" className="cursor-pointer ">
                  <FaArrowLeftLong />
                </Link>
              </span>
              <h2 className="font-bold text-xl ml-28">Verify Otp</h2>
            </div>
          </div>
          <p className="text-sm text-center  text-gray-500 mt-4">
            Don't worry! It happens.Please Enter Otp. <br />
          </p>

          <div className="div mt-12">
            <form action="" onSubmit={handleVerifyOtp}>
              <div className="lg:flex lg:flex-col md:flex md:flex-col gap-8">
                <div className="flex justify-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={
                      <span className="mx-2  text-[#FCC827]">--</span>
                    }
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="w-16 h-16  text-2xl text-center border-2 border-[#FCC827] rounded-md focus:outline-none focus:border-[#ecdb76] transition-all duration-300"
                      />
                    )}
                  />
                </div>

                <div className="button ">
                  <button className="cursor-pointer w-full sm:w-[335px] p-3 hover:bg-[#ecdb76] font-bold bg-[#FCC827]">
                    Submit
                  </button>
                </div>
                {/* <div className="forget text-center ">
                  <Link href="/" className="text-center">
                    Login Now
                  </Link>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="secondimage">
        <Image
          src="/newl3.png"
          width={520}
          className={`${styles.logoImage} absolute w-[35%] bottom-0 right-0 sm:w-[40%] md:w-[45%] lg:w-[35%]`}
          height={350}
          alt="l3"
        />
      </div>
    </div>
  );
};

export default VerifyOtpPage;
