import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex justify-between p-4 items-center w-[100%] mt-[30px]">
        <div className="w-full px-6">
          <h2 className="text-4xl ml-8 font-bold !text-[#202020]">
            User Details
          </h2>
          <p className="text-gray-500 mt-5 ml-9 text-xl">
            Dashboard <span className="text-gray-500 ml-5">Users</span>{" "}
            <span className="text-black ml-5">Users Details</span>
          </p>

          <div className="overflow-x-auto shadow-2xl mt-6">
            <div className="min-w-full bg-white h-[220px] flex">
              <div className="flex items-center ml-5">
                <Image
                  src="/user.png"
                  alt="user Photo"
                  width={180}
                  height={180}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-black font-bold text-2xl md:mr-60 lg:mr-130 mt-10 ml-4">
                  Virat Kohli
                </h1>
                <div className="flex flex-row items-center ml-4">
                  <Image
                    src="/images/phoneicon.png"
                    alt="mobile"
                    height={8}
                    width={18}
                    className="mb-2 mt-6"
                  />{" "}
                  <p className="text-xl mt-4 ml-3">9090909090</p>
                  <Image
                    src="/images/mailicon.png"
                    alt="mail"
                    height={8}
                    width={18}
                    className="mb-2 mt-6 ml-10"
                  />{" "}
                  <p className="text-xl mt-4 ml-4">abc123@gmail.com{}</p>
                </div>
                <div className="flex flex-row items-center  ml-4">
                  <Image
                    src="/images/locationicon.png"
                    alt="address"
                    height={8}
                    width={18}
                    className="mb-2 mt-6"
                  />
                  <p className="text-xl mt-4 ml-4">
                    31/outer ring road indl A,Delhi,Mumbai,111021,India
                  </p>
                </div>
              </div>
              <div className="w-[400px] flex justify-end mt-10 ml-4 gap-[76px] text-xl">
                <p className="">Total Order:{}</p>
                <p className="">Status{}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto shadow-2xl px-10">
        <table className="min-w-full bg-white rounded-2xl ">
          <thead className="bg-[#FAFAFA] text-[#202020]">
            <tr className="text-md  font-bold border-gray-300">
              <th className="px-4 py-3 w-[150px]">Order. No</th>
              <th className="px-6 py-3 text-left w-[255px]">Date</th>
              <th className="px-6 py-3 text-left w-[305px]">User Details</th>
              <th className="px-4 py-3 text-left ">Amount</th>

              <th className="px-4 py-3 text-left">Payment Type</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>{/* Content */}</tbody>
        </table>
      </div>
    </>
  );
};

export default page;
