import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DialogActions } from "@mui/material";
import { apiRequest } from "@/api/ApiCall";

interface ModalHomeProps {
  open: boolean;
  handleClose: () => void;
  setRenderedSections: React.Dispatch<React.SetStateAction<string[]>>;
  setAddSection: (sectionId: number) => void;
}

interface SectionIdMap {
  [key: string]: number;
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

const sectionIdMap: SectionIdMap = {
  banner: 1,
  category: 2,
  brand: 3,
  advertise: 4,
};

const ModalHome = ({
  open,
  handleClose,
  setRenderedSections,
  setAddSection,
}: ModalHomeProps) => {
  const [selectedSection, setSelectedSection] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedSection(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sectionId = sectionIdMap[selectedSection];
    if (selectedSection) {
      setRenderedSections((prev) => [...prev, selectedSection]);
    }
    setSelectedSection("");
    handleClose();

    const res = await apiRequest({
      method: "post",
      url: "/add_section",
      data: { id: sectionId },
    });
    setAddSection(res?.data?.data?.section_id);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="!p-0 !border-none !w-[415px]">
        <form
          className="flex flex-col bg-white py-6 justify-center items-center text-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold">Add Section</h1>
          <div className="flex flex-col justify-start mt-5 space-y-5">
            <div className="flex flex-row space-x-5 justify-start">
              <input
                type="radio"
                name="section"
                value="banner"
                id="1"
                checked={selectedSection === "banner"}
                onChange={handleChange}
              />
              <label htmlFor="1">Slider with Banner</label>
            </div>
            <div className="flex flex-row space-x-5 justify-start">
              <input
                type="radio"
                name="section"
                value="category"
                id="2"
                checked={selectedSection === "category"}
                onChange={handleChange}
              />
              <label htmlFor="2">Shop By Category</label>
            </div>
            <div className="flex flex-row space-x-5 justify-start">
              <input
                type="radio"
                name="section"
                value="brand"
                id="3"
                checked={selectedSection === "brand"}
                onChange={handleChange}
              />
              <label htmlFor="3">Slider with Brand</label>
            </div>
            <div className="flex flex-row space-x-5 justify-start">
              <input
                type="radio"
                name="section"
                value="advertise"
                id="4"
                checked={selectedSection === "advertise"}
                onChange={handleChange}
              />
              <label htmlFor="4">Slider with Advertisement</label>
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
