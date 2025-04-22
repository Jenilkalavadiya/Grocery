"use client";

import CustomSeparator from "@/app/components/Bradcrumbs";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import GetCoupon from "@/app/components/GetCoupon";
import { apiRequest } from "@/api/ApiCall";
import { Button } from "@mui/material";
import ModalCoupon from "@/utils/ModalCoupon";

const page = () => {
  const [page, setPage] = useState(1);
  const [coupon, setCoupon] = useState<any>(null);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
  };
  const getCoupon = async () => {
    const res = await apiRequest({
      method: "get",
      url: `/get_coupons?pageNumber=${page}&pageLimit=5`,
    });

    console.log("coupon", res);

    setCoupon(res?.data?.data);
  };

  useEffect(() => {
    getCoupon();
  }, [page]);
  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl  font-bold !text-[#202020]">
            Coupon Management
          </h2>
          <div className="mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"couponmanagment"}
              className="flex"
            />
          </div>
        </div>

        {/*  Add Coupon ***************** */}

        <Button
          className="!bg-[#FCC827] !text-black !font-extrabold h-[45px] p-1"
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
            id={id}
          />
        )}
      </div>

      {/* USERS TABLE************  */}

      <div className="mt-3 m-auto  ">
        <GetCoupon
          coupon={coupon}
          getCoupon={getCoupon}
          handleOpen={handleOpen}
          setId={setId}
        />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(coupon?.Total_Count / 5))}
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
