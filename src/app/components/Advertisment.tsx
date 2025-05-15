import Image from "next/image";
import React from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
import { Button } from "@mui/material";
import Advertise_add_Modal from "./Advertise_add_Modal";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";

const Advertisment = ({ component, getComponents }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (itemID: number) => {
    await apiRequest({
      method: "delete",
      url: `/delete_home_management?id=${itemID}&fkSectionId=4`,
    });
    getComponents();
    toast.success("Banner Deleted");
  };
  return (
    <section className="bg-white p-4 rounded shadow mt-5">
      <h2 className="text-lg font-semibold mb-3">Advertisement</h2>
      <div className="flex gap-4 overflow-x-auto">
        {component[0]?.section_advertisements[0]?.section_advertisements?.map(
          (item, index) => (
            <div key={index} className="relative min-w-[300px]">
              <Image
                src={item?.image}
                alt={`Banner ${index + 1}`}
                width={135}
                height={125}
                className="rounded-md h-40 w-full object-cover"
              />
              <button
                onClick={() => {
                  handleDelete(item?.id);
                }}
              >
                <Image
                  src={off}
                  alt="close"
                  width={35}
                  height={25}
                  className="absolute top-1 right-1"
                />
              </button>
            </div>
          )
        )}

        <div className="flex items-center justify-center min-w-[300px] h-40 bg-[#FAFAFA] rounded-md cursor-pointer">
          <Button onClick={handleOpen}>
            <Image src={plus} alt="plus" width={50} height={55} />
          </Button>
          {open && (
            <Advertise_add_Modal
              open={open}
              handleClose={handleClose}
              getComponents={getComponents}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Advertisment;
