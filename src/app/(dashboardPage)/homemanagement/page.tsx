"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DialogActions } from "@mui/material";
import Banner from "@/app/components/Banner";
import CustomSeparator from "@/app/components/Bradcrumbs";
import ShopByCategory from "@/app/components/ShopByCategory";
import Advertisment from "@/app/components/Advertisment";
import BrandHomemange from "@/app/components/BrandHomemange";
import withAuth from "@/protected/withAuth";
import Image from "next/image";
import Basket from "../../../../public/basket.png";
import { signalApiCall } from "@/utils/apiSignals";

const sectionIdMap: Record<string, number> = {
  banner: 1,
  category: 2,
  brand: 3,
  advertise: 4,
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Banners {
  id: number;
  image: string;
  Section_Name: string;
  Id: number;
  category: {
    category_name: string;
  };
  offer: string;
  section_brand?: {
    id: number;
    image: string;
    name: string;
  }[];
}

interface AddSectionModalProps {
  open: boolean;
  handleClose: () => void;
  setRenderedSections: React.Dispatch<React.SetStateAction<string[]>>;
  renderedSections: string[];
}

const sectionOptions = [
  { key: "banner", label: "Slider with Banner" },
  { key: "category", label: "Shop By Category" },
  { key: "brand", label: "Slider with Brand" },
  { key: "advertise", label: "Slider with Advertisement" },
] as const;

const AddSectionModal: React.FC<AddSectionModalProps> = ({
  open,
  handleClose,
  setRenderedSections,
  renderedSections,
}) => {
  const [selectedSection, setSelectedSection] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSection(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSection) return;

    setRenderedSections((prev) => {
      if (prev.includes(selectedSection)) return prev;
      return [...prev, selectedSection];
    });

    await signalApiCall<{ success: boolean }>(
      "post",
      "/add_section",
      { id: sectionIdMap[selectedSection] },
      { showLoading: true }
    );

    setSelectedSection("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} className="!p-0 !border-none !w-[415px]">
        <form
          className="flex flex-col bg-white py-6 justify-center items-center text-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold">Add Section</h1>
          <div className="flex flex-col justify-start mt-5 space-y-5">
            {sectionOptions.map((option, index) => (
              <div
                className="flex flex-row space-x-5 justify-start"
                key={option.key}
              >
                <input
                  type="radio"
                  name="section"
                  value={option.key}
                  id={String(index + 1)}
                  checked={selectedSection === option.key}
                  onChange={handleChange}
                  disabled={renderedSections.includes(option.key)}
                />
                <label htmlFor={String(index + 1)}>{option.label}</label>
              </div>
            ))}
          </div>
          <DialogActions>
            <div className="flex justify-center items-center mt-5">
              <button
                type="submit"
                className="px-6 py-2 bg-amber-400 font-bold"
              >
                Submit
              </button>
            </div>
          </DialogActions>
        </form>
      </Box>
    </Modal>
  );
};

// Main Page Component Cheee
const Page = () => {
  const [open, setOpen] = useState(false);
  const [renderedSections, setRenderedSections] = useState<string[]>([]);
  const [componentsData, setComponentsData] = useState<
    Record<string, Banners[]>
  >({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hasAddedSection = renderedSections.length > 0;

  useEffect(() => {
    const saved = localStorage.getItem("renderedSections");
    if (saved) {
      setRenderedSections(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (renderedSections.length > 0) {
      localStorage.setItem(
        "renderedSections",
        JSON.stringify(renderedSections)
      );
    }
  }, [renderedSections]);

  const fetchAll = async () => {
    try {
      const dataMap = await Promise.all(
        renderedSections.map(async (section) => {
          const sectionId = sectionIdMap[section];
          try {
            const res = await signalApiCall<{ result: Banners[] }>(
              "get",
              `/get_all_home_management?fk_section_id=${sectionId}`,
              undefined,
              { showLoading: true }
            );
            return [section, res?.result || []] as const;
          } catch (err) {
            console.error(`Error fetching section ${section}:`, err);
            return [section, []] as const;
          }
        })
      );

      setComponentsData(Object.fromEntries(dataMap));
    } catch (err) {
      console.error("Error fetching sections:", err);
    }
  };

  useEffect(() => {
    if (renderedSections.length > 0) {
      fetchAll();
    }
  }, [renderedSections]);

  const componentMap = {
    banner: {
      component: Banner,
      transform: (data: Banners[]) => ({ banner: data }),
    },
    category: {
      component: ShopByCategory,
      transform: (data: Banners[]) => [{ shop_by_category: data }],
    },
    advertise: {
      component: Advertisment,
      transform: (data: Banners[]) => [{ section_advertisements: data }],
    },
    brand: {
      component: BrandHomemange,
      transform: (data: Banners[]) => [{ section_brand: data }],
    },
  } as const;

  const renderComponent = (section: string) => {
    const data = componentsData[section] || [];
    const config = componentMap[section as keyof typeof componentMap];

    if (!config) return null;

    const { component: Component, transform } = config;
    return (
      <Component
        key={section}
        component={transform(data)}
        getComponents={fetchAll}
      />
    );
  };

  return (
    <div>
      {!hasAddedSection ? (
        <div className="flex items-center justify-center px-7 py-5 mt-15 h-[calc(100vh-180px)]">
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
              <Image
                width={200}
                height={200}
                src={Basket}
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
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center w-[100%] my-[40px]">
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
          </div>
        </div>
      )}

      <AddSectionModal
        open={open}
        handleClose={handleClose}
        setRenderedSections={setRenderedSections}
        renderedSections={renderedSections}
      />

      <div className="h-[calc(100vh-205px)] ">
        {renderedSections.map((section) => renderComponent(section))}
      </div>
    </div>
  );
};

export default withAuth(Page);
