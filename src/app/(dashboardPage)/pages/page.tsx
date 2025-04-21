"use client";

import CustomSeparator from "@/app/components/Bradcrumbs";
import EditorPages from "@/app/components/EditorPages";
import { Button } from "@mui/material";
import ImageNext from "next/image";

export default function EditorPage() {
  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl  font-bold !text-[#202020]">Pages</h2>
          <div className="mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"page"}
              className="flex"
            />
          </div>
        </div>

        {/*  Add Coupon ***************** */}

        <Button
          className="!bg-[#FCC827] !text-black !font-extrabold h-[45px] p-1"

          // variant="outlined"
        >
          Add Page
        </Button>
      </div>

      <EditorPages />
    </div>
  );
}
