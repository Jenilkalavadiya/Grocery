import Image from "next/image";
import React from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
const bannerImages = ["./hm1.png", "./hm2.png"];
const Advertisment = () => {
  return (
    <section className="bg-white p-4 rounded shadow mt-5">
      <h2 className="text-lg font-semibold mb-3">Advertisement</h2>
      <div className="flex gap-4 overflow-x-auto">
        {bannerImages.map((src, index) => (
          <div key={index} className="relative min-w-[300px]">
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              className="rounded-md h-40 w-full object-cover"
            />
            <button>
              <Image
                src={off}
                alt="close"
                width={35}
                height={25}
                className="absolute top-1 right-1"
              />
            </button>
          </div>
        ))}

        <div className="flex items-center justify-center min-w-[300px] h-40 bg-[#FAFAFA] rounded-md cursor-pointer">
          <Image src={plus} alt="plus" width={50} height={55} />
        </div>
      </div>
    </section>
  );
};

export default Advertisment;
