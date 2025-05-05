"use client";

import CustomSeparator from "@/app/components/Bradcrumbs";
import EditorPages from "@/app/components/EditorPages";
import withAuth from "@/protected/withAuth";


function EditorPage() {
  return (
    <div className="text-black h-[calc(100vh-111px)]">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] my-[30px]">
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

        {/*  Add Pages ***************** */}
        {/* 
        <Button
          className="!bg-[#FCC827] !text-black !font-extrabold h-[45px] p-1"

          // variant="outlined"
        >
          Add Page
        </Button> */}
      </div>

      <div>
        <h2 className="font-bold text-xl">Terms & Conditions </h2>
      </div>

      <EditorPages />
    </div>
  );
}
export default withAuth(EditorPage);
