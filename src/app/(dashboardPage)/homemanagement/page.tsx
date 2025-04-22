"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ModalHome from "@/utils/ModalHome";
import Banner from "@/app/components/Banner";
import CustomSeparator from "@/app/components/Bradcrumbs";
import ShopByCategory from "@/app/components/ShopByCategory";
import Advertisment from "@/app/components/Advertisment";
import BrandHomemange from "@/app/components/BrandHomemange";
import { apiRequest } from "@/api/ApiCall";
interface Banners {
  Image: string;
  Section_Name: string;
  Id: number;
}
const Page = () => {
  const [open, setOpen] = useState(false);
  const [renderedSections, setRenderedSections] = useState<string[]>([
    "banner",
  ]);
  const [addSection, setAddSection] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [banner, setBanner] = useState<Banners[]>([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    const res = await apiRequest({
      method: "get",
      url: `/get_slider_with_banner`,
    });
    const response = res?.data?.data;
    setRenderedSections([response?.id]);
    console.log("response", response);
    setBanner(response.banner);
  };

  const renderComponent = (section: any) => {
    switch (section) {
      case 1:
        return <Banner key="banner" banner={banner} getBanners={getBanners} />;
      case "category":
        return <ShopByCategory key="category" />;
      case "advertise":
        return <Advertisment key="advertise" />;
      case "brand":
        return <BrandHomemange key="brand" />;
      default:
        return null;
    }
  };

  const hasAddedSection = renderedSections.length > 0;

  return (
    <div>
      {!hasAddedSection ? (
        <div className="flex items-center justify-center px-7 py-5 mt-15 h-[75vh]">
          <div className="flex flex-col justify-center items-center bg-white shadow-md w-[420px] py-10">
            <h1 className="text-[30px] font-bold tracking-wide">
              Home Management
            </h1>
            <div className="flex flex-row justify-center px-5 py-2">
              <div className="mt-2">
                <CustomSeparator
                  value1={"dashboard"}
                  value2={"homemanagement"}
                  className="flex text-md"
                />
              </div>
            </div>
            <div className="py-4 px-2">
              <img
                src="./basket.png"
                alt="Basket-img"
                className="grayscale-100"
              />
            </div>
            <div className="py-3">
              <Button
                className="!bg-[#FCC827] !text-black font-semibold h-[55px] p-1 w-[230px]"
                onClick={handleOpen}
              >
                Add Section
              </Button>
              {open && (
                <ModalHome
                  open={open}
                  handleClose={handleClose}
                  getBanners={getBanners}
                  setAddSection={setAddSection}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        // New Layout wrapper if at least one section is added
        <div className="flex justify-between items-center w-[100%] mt-[30px]">
          <div>
            <h2 className="text-3xl font-bold !text-[#202020]">
              Home Management
            </h2>
          </div>

          <div>
            <Button
              className="!bg-[#FCC827] !text-black font-semibold h-[45px] p-1"
              onClick={handleOpen}
            >
              Add Section
            </Button>
            {open && <ModalHome open={open} handleClose={handleClose} />}
          </div>
          {open && (
            <ModalHome
              open={open}
              handleClose={handleClose}
              setRenderedSections={setRenderedSections}
            />
          )}
        </div>
      )}

      {/* Render dynamic sections below */}
      <div className="mt-10 overflow-hidden">
        {renderedSections?.map((section) => renderComponent(section))}
      </div>
    </div>
  );
};

export default Page;
