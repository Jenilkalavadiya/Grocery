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
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

interface CouponFormValues {
  name: string;
  minimumPurchase: string;
  discountPrice: string;
  couponCode: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface ModalCouponProps {
  open: boolean;
  handleClose: () => void;
  getCoupon: () => void;
  id?: number | string;
}

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

const ModalCoupon = ({
  open,
  handleClose,
  getCoupon,
  id,
}: ModalCouponProps) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<CouponFormValues>({
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
          couponName: values.name,
          minimumPurchase: values.minimumPurchase,
          discountPrice: values.discountPrice,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          couponCode: values.couponCode,
          ...(id && { id }),
        };

        await apiRequest({
          method: "post",
          url: "/add_coupon",
          data: params,
        });

        toast.success(
          id ? "Coupon Updated Successfully" : "Coupon Added Successfully"
        );

        getCoupon();
        handleClose();
      } catch (error: unknown) {
        console.error("Error: ", error);
      }
    },
  });

  // Handle Date change
  const handleDateChange = (name: string, date: Dayjs | null) => {
    setFieldValue(name, date);
  };

  // Fetch coupon data by ID
  const getCouponById = async () => {
    const res = await apiRequest({
      method: "get",
      url: `/get_coupon_by_id?id=${id}`,
    });

    const result = res?.data?.data?.data;

    // Populate form fields with fetched data
    setFieldValue("name", result.Coupon_Name || "");
    setFieldValue("minimumPurchase", result.Min_Purchase || "");
    setFieldValue("discountPrice", result.Discount_Price || "");
    setFieldValue("couponCode", result.Coupon_Code || "");

    // Handling date range (startDate and endDate)
    if (result.Date) {
      const [startDate, endDate] = result.Date.split(" to ");
      setFieldValue("startDate", dayjs(startDate)); // Set start date
      setFieldValue("endDate", dayjs(endDate)); // Set end date
    }
  };

  useEffect(() => {
    if (id) {
      getCouponById();
    }
  }, [id, setFieldValue]);

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
            <h1 className="text-center font-bold text-2xl">
              {id ? "Edit Coupon" : "Add Coupon"}
            </h1>

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
              value={values.name.trim()}
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
              type="number"
              name="minimumPurchase"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
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
              type="number"
              name="discountPrice"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
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
            <span className="text-gray-400 font-bold">Date</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="startDate"
                label="Start Date"
                value={values.startDate}
                slotProps={datePicker}
                onChange={(newValue: Dayjs | null) =>
                  handleDateChange("startDate", newValue)
                }
              />
              <DatePicker
                name="endDate"
                label="End Date"
                value={values.endDate}
                slotProps={datePicker}
                onChange={(newValue: Dayjs | null) =>
                  handleDateChange("endDate", newValue)
                }
              />
            </LocalizationProvider>
            {errors.startDate && touched.startDate && (
              <div className="text-red-500">{String(errors.startDate)}</div>
            )}
            {errors.endDate && touched.endDate && (
              <div className="text-red-500">{String(errors.endDate)}</div>
            )}

            {/* Coupon Code */}
            <span className="text-gray-400 font-bold">Coupon Code </span>
            <input
              type="text"
              name="couponCode"
              value={values.couponCode.trim()}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[350px] border border-gray-400 focus:outline-none bg-white text-black h-[45px] p-2"
              placeholder="Coupon Code"
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
                {id ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCoupon;
