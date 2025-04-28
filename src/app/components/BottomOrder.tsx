import Image from "next/image"
import OrderTable from "./OrderTable"

const BottomOrder = ({orderDetails}:any) => {
  return (
    <div className="mt-4 flex gap-4 w-full">
        {/* BOTTOM LEFT */}
        <div className="w-[300px] p-5 shadow-xl border-gray-200 border">
          <div className="flex gap-4 items-center">
            <Image
              src="/user.png"
              alt="user Photo"
              width={100}
              height={100}
              className="rounded-full p-4"
            />
            <p className="font-bold">Virat Kohli</p>
          </div>

          <div className="flex gap-4 mb-3 items-center">
            <Image
              src="/images/phoneicon.png"
              alt="mobile"
              width={18}
              height={18}
              className=""
            />
            <p className="">8997978745</p>
          </div>
          <div className="flex gap-4 mb-3 items-center">
            <Image
              src="/images/mailicon.png"
              alt="email"
              width={18}
              height={18}
              className=""
            />
            <p className="">viratkohli@gmail.com</p>
          </div>

          <div className="flex gap-4 mt-2 items-center">
            <Image
              src="/images/locationicon.png"
              alt="address"
              width={18}
              height={18}
              className=""
            />
            <p className=" ">31 outer ringroad delhi mumbai india</p>
          </div>
        </div>

        {/* BOTTOM RIGHT TABLE DATA */}
        <div className="shadow-xl border-gray-200 border  w-[1000px] mt-[-40px] p-5 flex ">
          {/* Order Table */}
          <OrderTable orderDetails={orderDetails} />
        </div>
      </div>
  )
}

export default BottomOrder