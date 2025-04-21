"use client";

import { Configuration } from "@/_components/Validation";
import { apiRequest } from "@/api/ApiCall";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import close from "../../../public/images/close.svg";

const MangeForm = ({ boxOpen, handleClose }: any) => {
  const [manageDelivery, setManageDelivery] = useState(false);
  const [manageTax, setManageTax] = useState(false);

  useEffect(() => {
    if (boxOpen) {
      setManageDelivery(true);
      setManageTax(false);
    }
  }, [boxOpen]);

  const handleManageDeliveryClick = () => {
    setManageDelivery(true);
    setManageTax(false);
  };

  const handleManageTaxClick = () => {
    setManageTax(true);
    setManageDelivery(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { freeDelivery: "", deliveryCharge: "", tax: "" },
      validationSchema: manageDelivery
        ? Configuration.deliverySchema
        : Configuration.taxSchema, // Conditionally load validation schema
      onSubmit: async (values) => {
        if (manageDelivery) {
          await handleManageDeliverySubmit(values);
        } else if (manageTax) {
          await handleManageTaxSubmit(values);
        }
      },
    });

  // Handle API call for Manage Delivery
  const handleManageDeliverySubmit = async (values: any) => {
    const params = {
      free_delivery_upto: values.freeDelivery,
      delivery_charge: values.deliveryCharge,
      id: 1,
    };

    console.log("Submitting to Manage Delivery API with data:", params);

    try {
      const res = await apiRequest({
        method: "post",
        url: "/manage_delivery",
        data: params,
      });

      console.log("Delivery Response", res);
      if (res?.data?.data?.MESSAGE) {
        toast.success(res?.data?.data?.MESSAGE);
      }
    } catch (error) {
      console.error("Error while submitting Manage Delivery:", error);
      toast.error("Error while submitting Manage Delivery.");
    }

    handleClose();
  };

  // Handle API call for Manage Tax
  const handleManageTaxSubmit = async (values: any) => {
    const params = {
      tax: values.tax,
      id: 1,
    };

    console.log("Submitting to Manage Tax API with data:", params);

    try {
      const res = await apiRequest({
        method: "post",
        url: "/manage_tax",
        data: params,
      });

      console.log("Tax Response", res);
      if (res?.data?.data?.MESSAGE) {
        toast.success(res?.data?.data?.MESSAGE);
      }
    } catch (error) {
      console.error("Error while submitting Manage Tax:", error);
      toast.error("Error while submitting Manage Tax.");
    }

    handleClose(); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2
          id="modal-title"
          className="!font-bold !text-center !mb-3 !text-2xl"
        >
          Configuration
        </h2>

        <div className="absolute top-0 right-0 p-2">
          <button className="cursor-pointer" onClick={handleClose}>
            <Image src={close} alt="close" width={18} height={25} />
          </button>
        </div>

        {/* Manage Delivery || Manage Tax */}
        <div className="!flex !justify-between !gap-4 !mr-4 !mb-4">
          <Button
            onClick={handleManageDeliveryClick}
            className={`${
              manageDelivery
                ? " !border-b-4 !text-black !border-yellow-500"
                : "!font-normal !text-gray-400"
            }`}
          >
            Manage Delivery
          </Button>
          <Button
            onClick={handleManageTaxClick}
            className={`${
              manageTax
                ? " !border-b-4 !text-black !border-yellow-500"
                : "!font-normal !text-gray-400"
            }`}
          >
            Manage Tax
          </Button>
        </div>

        {/* Manage Delivery Form */}
        {manageDelivery && (
          <div className="flex flex-col">
            <span className="text-gray-400 font-bold">Free Delivery Upto</span>
            <input
              type="text"
              name="freeDelivery"
              className="w-[320px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-4 mb-4"
              placeholder="Free Delivery Upto"
              value={values.freeDelivery}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.freeDelivery && errors.freeDelivery && (
              <div className="text-red-500 text-sm">{errors.freeDelivery}</div>
            )}

            <span className="text-gray-400 font-bold">Delivery Charge</span>
            <input
              type="text"
              name="deliveryCharge"
              className="w-[320px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-4"
              placeholder="Delivery Charge"
              value={values.deliveryCharge}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.deliveryCharge && errors.deliveryCharge && (
              <div className="text-red-500 text-sm">
                {errors.deliveryCharge}
              </div>
            )}

            <div className="flex mb-2 justify-center items-center mt-3">
              <button
                type="submit"
                className="w-full font-bold !cursor-pointer bg-amber-300 p-3"
              >
                Update Delivery
              </button>
            </div>
          </div>
        )}

        {/* Manage Tax Form */}
        {manageTax && (
          <div className="flex flex-col">
            <span className="text-gray-400 font-bold">Tax%</span>
            <input
              type="text"
              name="tax"
              className="w-[320px] border border-gray-400 focus:outline-none bg-white text-black h-[50px] p-4"
              placeholder="Tax%"
              value={values.tax}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.tax && errors.tax && (
              <div className="text-red-500 text-sm">{errors.tax}</div>
            )}

            <div className="flex !mb-2 justify-center items-center !mt-4">
              <button
                type="submit"
                className="w-[320px] font-bold !cursor-pointer bg-amber-300 p-3"
              >
                Update Tax
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MangeForm;
