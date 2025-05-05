import neworder from "../../../public/newOrder.svg";
import preparing from "../../../public/preparing..svg";
import ready from "../../../public/ready.svg";
import waiting from "../../../public/waiting.svg";
import compelted from "../../../public/compelted.svg";
import Image from "next/image";

interface OrderDetails {
  order_no: string;
  order_type: number;
  payment_type: number;
  order_status: number;
}

interface TopOrderProps {
  orderDetails: OrderDetails | null;
}

const stepIcons = [neworder, preparing, ready, waiting, compelted];

const stepLabels = [
  "New Order",
  "Preparing",
  "Ready",
  "Waiting Pickup",
  "Completed",
];

const TopOrder = ({ orderDetails }: TopOrderProps) => {
  const activeStep = orderDetails?.order_status || 0;

  return (
    <div className="mt-10 flex gap-4 w-full">
      {/* Left Column - Order Details */}
      <div className="w-[300px] p-6 shadow-md border-gray-200 border">
        <p className="font-bold mb-3 text-lg text-center">
          {orderDetails?.order_no}
        </p>
        <div className="flex justify-between p-2">
          <p className="text-gray-400 font-bold text-lg">Order Type</p>
          <p className="mb-3 font-bold text-lg">
            {orderDetails?.order_type === 0 ? "Delivery" : "Pending"}
          </p>
        </div>
        <div className="flex justify-between p-2">
          <p className="text-gray-400 font-bold text-lg">Payment Type</p>
          <p className="font-bold text-lg">
            {orderDetails?.payment_type === 0 ? "Cash" : "Card"}
          </p>
        </div>
      </div>

      {/* Right Column - Custom Stepper */}
      <div className="shadow-md border border-gray-200 w-[1000px] h-[120px] px-10 py-6 flex items-center">
        <div className="flex items-center w-full relative">
          {stepLabels.map((label, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;
            const isLast = index === stepLabels.length - 1;

            return (
              <div
                className="flex-1 flex flex-col items-center relative"
                key={label}
              >
                {/* Line to next step */}
                {!isLast && (
                  <div
                    className={`absolute top-[25px]  w-full h-1 z-0 ${
                      index < activeStep ? "bg-green-600" : "bg-gray-300"
                    }`}
                    style={{ transform: "translateX(50%)", width: "100%" }}
                  ></div>
                )}

                {/* Icon with border */}
                <div
                  className={`z-10 rounded-full p-1 border-2 mb-2 bg-white ${
                    isCompleted || isActive
                      ? "border-green-600"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={stepIcons[index]}
                    alt={label}
                    width={40}
                    height={40}
                    className={`${
                      isCompleted || isActive ? "" : "grayscale opacity-50"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-sm font-medium text-center ${
                    isCompleted || isActive ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopOrder;
