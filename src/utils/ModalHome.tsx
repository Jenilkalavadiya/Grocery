import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DialogActions } from "@mui/material";
import Banner from "@/app/components/Banner";
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
const ModalHome = ({ open, handleClose }: any) => {
  const [section, setSection] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [renderedSections, setRenderedSections] = useState<string[]>([]);

  const toggleSection = () => {
    setSection(!section);
  };

  const renderComponent = (section: string) => {
    switch (section) {
      case "banner":
        return <Banner key="banner" />;
      case "category":
        return <Shopbycategory key="category" />;
      case "advertise":
        return <Advertise key="advertise" />;
      case "brand":
        return <Shopbybrand key="brand" />;
      default:
        return null;
    }
  };

  const handleChange = (e: any) => {
    const { name } = e.target;
    setSelectedSection(name);
  };

 

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedSection && !renderedSections.includes(selectedSection)) {
      setRenderedSections((prev) => [...prev, selectedSection]);
    }
    setSection(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="!p-0 !border-none !w-[415px]">
        {/* <h1 className="text-center font-bold text-2xl">Add Section</h1> */}
        <form
          className="flex flex-col bg-white py-6 justify-center items-center text-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold">Add Section</h1>
          <div className="flex flex-col justify-start mt-5 space-y-5">
            <div className="flex flex-row space-x-5 justify-start">
              <input
                type="radio"
                name="banner"
                value="banner"
                onChange={handleChange}
              />
              <label>Slider with Banner</label>
            </div>
            <div className="flex flex-row space-x-5 justify-start">
              <input
                type="radio"
                name="category"
                value="category"
                onChange={handleChange}
              />
              <label>Slider with Category</label>
            </div>
            <div className="flex flex-row space-x-5 justify-start">
              <input
                type="radio"
                name="advertise"
                value="advertise"
                onChange={handleChange}
              />
              <label>Slider with Advertisement</label>
            </div>
            <div className="flex flex-row space-x-5 justify-start">
              <input
                type="radio"
                name="brand"
                value="brand"
                onChange={handleChange}
              />
              <label>Slider with Brand</label>
            </div>
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

export default ModalHome;
