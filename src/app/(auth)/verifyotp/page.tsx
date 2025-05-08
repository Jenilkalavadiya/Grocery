"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
// import styles from "@/styles/login.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import l2 from "../../../../public/l2.png";

import OtpInput from "react-otp-input";
import { apiRequest } from "@/api/ApiCall";
import withoutAuth from "@/protected/withoutAuth";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      toast.error("please enter otp");
      return;
    }

    try {
      const response = await apiRequest({
        method: "post",
        url: "/otp-verify",
        data: new URLSearchParams({ otp }),
      });

      if (response?.data?.code === 1) {
        toast.success("OTP verified successfully!");
        router.push("/resetpassword");
      } else {
        toast.error(response?.data?.message || "OTP verification failed.");
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error(error);
      toast.error(apiError?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex h-screen bg-[url(/background.png)] bg-cover flex-col justify-between gap-2">
      <div className="firstimage">
        <Image
          src={l2}
          width={491}
          className={`  absolute w-[32%] bottom-0 left-0 sm:w-[40%] md:w-[45%] lg:w-[33%]`}
          height={314}
          alt="l2"
        />
      </div>

      <div className="content flex mt-5 flex-col items-center w-full">
        <div
          className={`flex bg-white shadow-2xl py-10 flex-col items-center text-black w-[90%] sm:w-[80%]  md:w-[50%] lg:w-[33%] xl:w-[30%]`}
        >
          <div className="flex w-[90%]">
            <div className="flex items-center">
              <span className="">
                <Link href="/forgot" className="cursor-pointer ">
                  <FaArrowLeftLong />
                </Link>
              </span>
              <div className="flex items-center ml-40">
                <h2 className="font-bold text-xl text-center">Verify Otp</h2>
              </div>
            </div>
          </div>
          <p className="text-sm text-center text-gray-500 mt-4">
            Dont worry! It happens.Please Enter Otp. <br />
          </p>

          <div className="div mt-6">
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
                        className="w-100   h-16 text-4xl text-center border-2 border-[#FCC827] rounded-md focus:outline-none focus:border-[#ecdb76] transition-all duration-300"
                      />
                    )}
                  />
                </div>

                <div className="button ">
                  <button className="cursor-pointer w-full sm:w-[335px] p-3 hover:bg-[#ecdb76] font-bold bg-[#FCC827]">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="secondimage">
        <Image
          src="/newl3.png"
          width={520}
          className={`absolute w-[35%] bottom-0 right-0 sm:w-[40%] md:w-[45%] lg:w-[35%]`}
          height={350}
          alt="l3"
        />
      </div>
    </div>
  );
};

export default withoutAuth(VerifyOtpPage);
