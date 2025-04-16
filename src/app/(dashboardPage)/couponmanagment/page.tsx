"use client";

import CustomSeparator from "@/app/components/Bradcrumbs";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import GetCoupon from "@/app/components/GetCoupon";
import { getFunction } from "@/api/ApiCall";
import { Button } from "@mui/material";
import ModalCoupon from "@/utils/ModalCoupon";

const page = () => {
  const [page, setPage] = useState(1);
  const [coupon, setCoupon] = useState(null);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
  };

  useEffect(() => {
    getCoupon();
  }, [page]);

  const getCoupon = async () => {
    const res = await getFunction(`/get_coupons?pageNumber=1&pageLimit=5`);
    console.log("coupon", res);
    setCoupon(res?.data?.data);
  };

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl ml-8 font-bold !text-[#202020]">
            Coupon Management
          </h2>
          <div className="ml-8 mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"couponmanagement"}
              className="flex"
            />
          </div>
        </div>

        {/* SEARCH USERS INPUT ***************** */}

        <div className="">
          <Button
            className="!bg-[#FCC827] !text-black font-extrabold h-[45px] p-1"
            onClick={handleOpen}
            // variant="outlined"
          >
            Add Coupon
          </Button>
          {open && (
            <ModalCoupon
              open={open}
              handleClose={handleClose}
              getCoupon={getCoupon}
            />
          )}
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="p-7 m-automl-2  ">
        <GetCoupon coupon={coupon} getCoupon={getCoupon} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(coupon?.Total_Count / 6))}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default page;
