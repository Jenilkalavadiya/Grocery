"use client";

import { AddCoupon } from "@/_components/Validation";
import { apiRequest } from "@/api/ApiCall";
import { Box, Modal } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { toast } from "react-toastify";

import close from "../../public/images/close.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker } from "@mui/x-date-pickers";
import { datePicker } from "@/_components/textFieldStyles";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalCoupon = ({ open, handleClose, getCoupon }: any) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      minimumPurchase: "",
      discountPrice: "",
      couponCode: "",
      startDate: null,
      endDate: null,
    },
    validationSchema: AddCoupon,
    onSubmit: async (values) => {
      try {
        const startDateFormatted = dayjs(values.startDate).format("YYYY-MM-DD");
        const endDateFormatted = dayjs(values.endDate).format("YYYY-MM-DD");
        const params = {
          coupon_name: values.name,
          minimum_purchase: values.minimumPurchase,
          discount_price: values.discountPrice,
          start_date: startDateFormatted,
          end_date: endDateFormatted,
          coupon_code: values.couponCode,
        };

        // POST API
        const res = await apiRequest({
          method: "post",
          url: "/add_coupon",
          data: { params },
        });

        console.log("coupon", res);
        toast.success("Coupon Added Successfully");

        getCoupon();
        handleClose();
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });

  const handleDateChange = (name: string, date: any) => {
    setFieldValue(name, date);
  };

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="!flex !justify-center !border-none !items-center !px-10 !w-[440px]"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 "
            id="modal"
          >
            <h1 className="text-center font-bold text-2xl">Add Coupon</h1>

            {/* Close Button */}
            <div className="absolute top-0 right-0 p-2">
              <button className="cursor-pointer" onClick={handleClose}>
                <Image src={close} alt="close" width={18} height={25} />
              </button>
            </div>

            {/* Coupon Name */}
            <span className="text-gray-400 font-bold">Coupon Name </span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[45px] p-2"
              placeholder="Name"
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}

            {/* Minimum Purchase */}
            <span className="text-gray-400 font-bold">Minimum Purchase </span>
            <input
              type="text"
              name="minimumPurchase"
              value={values.minimumPurchase}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[45px] p-2"
              placeholder="Minimum Purchase"
            />
            {errors.minimumPurchase && touched.minimumPurchase && (
              <div className="text-red-500">{errors.minimumPurchase}</div>
            )}

            {/* Discount Price */}
            <span className="text-gray-400 font-bold">Discount Price </span>
            <input
              type="text"
              name="discountPrice"
              value={values.discountPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[45px] p-2"
              placeholder="Discount Price"
            />
            {errors.discountPrice && touched.discountPrice && (
              <div className="text-red-500">{errors.discountPrice}</div>
            )}

            {/* DatePicker */}
            <span className="text-gray-400  font-bold">Date</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="startDate"
                label="Start Date"
                value={values.startDate}
                slotProps={datePicker}
                onChange={(newValue: any) =>
                  handleDateChange("startDate", newValue)
                }
              />
              <DatePicker
                name="endDate"
                label="End Date"
                value={values.endDate}
                slotProps={datePicker}
                onChange={(newValue: any) =>
                  handleDateChange("endDate", newValue)
                }
              />
            </LocalizationProvider>
            {errors.startDate && touched.startDate && (
              <div className="text-red-500">{errors.startDate}</div>
            )}
            {errors.endDate && touched.endDate && (
              <div className="text-red-500">{errors.endDate}</div>
            )}
            {/* Coupon Code */}
            <span className="text-gray-400 font-bold">Coupon Code </span>
            <input
              type="text"
              name="couponCode"
              value={values.couponCode}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[45px] p-2"
              placeholder="Coupon Code "
            />
            {errors.couponCode && touched.couponCode && (
              <div className="text-red-500">{errors.couponCode}</div>
            )}

            {/* Submit Button */}
            <div className="flex mb-3 mt-2">
              <button
                type="submit"
                className="w-[350px] font-bold cursor-pointer bg-amber-300 p-3"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCoupon;
