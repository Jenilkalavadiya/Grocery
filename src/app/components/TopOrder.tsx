import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import neworder from "../../../public/newOrder.svg";
import preparing from "../../../public/preparing..svg";
import ready from "../../../public/ready.svg";
import waiting from "../../../public/waiting.svg";
import compelted from "../../../public/compelted.svg";
import Image from "next/image";

const steps = [
  "New Order",
  "Preparing",
  "Ready",
  "Waiting Pickup",
  "Completed",
];

const TopOrder = () => {
  const activeStep = 1; // This can be dynamic based on the order status

  return (
    <div className="mt-10  flex gap-4 w-full">
      {/* Left Column - Order Details */}
      <div className="w-[300px] p-5 shadow-xl border-gray-200 border">
        <p className="font-bold mb-3 text-center">#48574897974</p>
        <p className="text-gray-500 mb-3">Order Type</p>
        <p className="text-gray-500">Payment Type</p>
      </div>

      {/* Right Column - Order Status */}
      <div className="shadow-xl border-gray-200 border w-[1000px] h-[100px] p-5 flex ">
        <div className="flex w-full gap-4 items-center justify-between">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                let stepIcon: any;

                // Fixing icon assignment for each step
                if (index === 0) stepIcon = neworder;
                else if (index === 1) stepIcon = preparing;
                else if (index === 2) stepIcon = ready;
                else if (index === 3) stepIcon = waiting;
                else if (index === 4) stepIcon = compelted;

                return (
                  <Step key={index}>
                    <StepLabel
                      StepIconComponent={() => (
                        <div className="flex flex-col items-center justify-center">
                          {stepIcon && (
                            <Image
                              src={stepIcon}
                              alt={label}
                              width={50} // Adjust size if needed
                              height={50}
                              className="mb-2" // Spacing between image and label
                            />
                          )}
                          <span className="text-sm text-center">{label}</span>{" "}
                          {/* Center label text */}
                        </div>
                      )}
                    />
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default TopOrder;
