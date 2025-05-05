"use client";
import { apiRequest } from "@/api/ApiCall";
import CustomSeparator from "@/app/components/Bradcrumbs";
import FaqModal from "@/utils/FaqModal";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Faq {
  Answer: string;
  Faq_id: number;
  Question: string;
}
const Page = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [open, setOpen] = useState(false);

  const handleDelete = async (itemID: number) => {
    try {
      await apiRequest({
        method: "delete",
        url: `/delete_faqs?id=${itemID}`,
      });
      toast.success("Faq Deleted");
      getfaqs();
    } catch (error: unknown) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getfaqs = async () => {
    try {
      const result = await apiRequest({ method: "get", url: "/get_all_faqs" });
      const data = result?.data?.data?.result as Faq[];
      setFaqs(data);
    } catch (error: unknown) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to fetch FAQs");
    }
  };

  useEffect(() => {
    getfaqs();
  }, []);
  return (
    <div>
      <div className="text-black h-[calc(100vh-111px)]">
        {/* SERCH INPUT  */}
        <div className="flex justify-between items-center w-[100%] my-[30px]">
          <div>
            <h2 className="text-3xl font-bold !text-[#202020] ">
              Frequenty Asked Questions
            </h2>
            <div className="mt-2">
              <CustomSeparator
                value1={"dashboard"}
                value2={"faq"}
                className="flex"
              />
            </div>
          </div>
          <Button
            className="!bg-[#FCC827] !text-black !font-extrabold h-[45px] p-1"
            onClick={handleOpen}
            variant="outlined"
          >
            Add Faq
          </Button>
          {open && (
            <FaqModal open={open} handleClose={handleClose} getfaqs={getfaqs} />
          )}
        </div>

        <div className="faq-list space-y-6 mt-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="p-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#202020]">
                  {item.Question}
                </p>

                <button
                  onClick={() => handleDelete(item?.Faq_id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  🗑️
                </button>
              </div>

              <div className="p-4 text-gray-700 bg-gray-50">
                <p>{item.Answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
