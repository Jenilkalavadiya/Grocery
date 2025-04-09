"use client";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CategoryItem from "@/app/components/CategoryItem";
import { getFunction } from "@/api/ApiCall";
import Button from "@mui/material/Button";
import ModalCategory from "@/utils/ModalCategory";

const page = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllCategory = async () => {
    try {
      const res = await getFunction(
        `/getcategories?pageNumber=${page}&pageLimit=5`
      );
      // console.log("REs", res);
      // console.log("page", page);
      const data = await res?.data?.data;
      setCategory(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategory();
  }, [page]);

  const filteredCategories = category.filter((item: any) =>
    item.Category_Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between p-4 items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl ml-8 font-bold !text-[#202020]">
            Categories
          </h2>
        </div>

        <div className="searchfiled mr-8 flex gap-2">
          <input
            type="text"
            placeholder="Search Categories.. "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 border-[#DADDE1] bg-white focus:outline-none border w-[244px] h-[45px]"
          />

          <div className="w-[130px]">
            <Button
              className="!bg-[#FCC827] !text-black font-semibold h-[45px] p-1"
              onClick={handleOpen}
              // variant="outlined"
            >
              {" "}
              Add Category
            </Button>
            {open && <ModalCategory open={open} handleClose={handleClose} />}
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="max-w-[1400px] m-auto mt-3">
        <CategoryItem filteredCategories={filteredCategories} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default page;

// <div className="flex flex-col gap-4">
//                   <span>Category :</span>
//                   <input
//                     type="text"
//                     className="w-[350px] bg-white text-black h-[50px] p-2"
//                     placeholder="Category."
//                   />

//                   <input
//                     type="file"
//                     className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[100px]"
//                     placeholder="Upload image"
//                   />
//                   <div className="flex justify-between">
//                     <span>Status</span>
//                     <label className="inline-flex items-center mb-5 cursor-pointer">
//                       <input type="checkbox" className="sr-only peer" />
//                       <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
//                     </label>
//                   </div>
//                   <div className="flex">
//                     <button className="w-[350px] bg-amber-300 p-3">Save</button>
//                   </div>
//                 </div>

// {/* <Dialog
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">
//                 {/* {"Add Category"} */}
//               </DialogTitle>
//               <DialogContent>
//                 <form
//                   onSubmit={handleSubmit}
//                   className="flex flex-col gap-4"
//                   id="modal "
//                 >
//                   <span>Category Name :</span>
//                   <input
//                     type="text"
//                     name="name"
//                     value={values.name}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className="w-[350px] bg-white text-black h-[50px] p-2"
//                     placeholder="Category Name"
//                   />
//                   {errors.name && touched.name && (
//                     <div className="text-red-500">{errors.name}</div>
//                   )}

//                   <input
//                     type="file"
//                     name="image"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFieldValue("image", file);
//                       }
//                     }}
//                     onBlur={handleBlur}
//                     className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[100px]"
//                     placeholder="Upload image"
//                   />
//                   {errors.image && touched.image && (
//                     <div className="text-red-500">{errors.image}</div>
//                   )}

//                   <div className="flex justify-between">
//                     <span>Status</span>
//                     <label className="inline-flex items-center mb-5 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         name="status"
//                         checked={values.status}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         className="sr-only peer !border-0"
//                       />
//                       <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
//                     </label>
//                   </div>

//                   <div className="flex"></div>
//                 </form>
//               </DialogContent>
//               <DialogActions>
//
//                 <Button
//                   onClick={handleClose}
//                   autoFocus
//                   className="btn !absolute right-0 top-0"
//                 >
//                   X
//                 </Button>
//               </DialogActions>
//             </Dialog> */}
