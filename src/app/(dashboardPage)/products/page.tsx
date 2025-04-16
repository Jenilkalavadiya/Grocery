"use client";

// import axios from "axios";

import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import CustomSeparator from "@/app/components/Bradcrumbs";
import Dashboard from "../dashboard/page";
import GetProduct from "@/app/components/GetProduct";
import { apiRequest } from "@/api/ApiCall";
const page = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(null);
  const [page, setPage] = useState(1);

  const handleChange = (e: any) => {
    const trimmedSearch = e.target.value.trim();
    setSearch(trimmedSearch);
  };

  //GET PRODUCT
  const getProduct = async () => {
    const res = await apiRequest({
      method: "get",
      url: `/get_products?pageNumber=1&pageLimit=10&search=${search}`,
    });

    console.log("getProduct", res?.data);
    const data = await res?.data?.data?.result;
    const total = res?.data?.data?.Total_Count;
    setProduct(data);
    setPage(total);
  };

  useEffect(() => {
    getProduct();
  }, [search, page]);

  const router = useRouter();
  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl ml-8 font-bold !text-[#202020]">Products</h2>
          <div className="ml-8 mt-2">
            <CustomSeparator className="flex" />
          </div>
        </div>

        {/* SEARCH USERS INPUT ***************** */}

        <div className="searchfiled mr-8  flex gap-2">
          <input
            type="text"
            placeholder="Search Products... "
            value={search}
            onChange={(e) => handleChange(e)}
            className="px-2 border-[#DADDE1] bg-white focus:outline-none border w-[244px] h-[45px]"
          />

          <div className="w-[130px]">
            <button
              className="bg-[#FCC827] cursor-pointer text-black font-semibold h-[45px] p-2.5"
              onClick={() => router.push("/products/addProduct")}
            >
              {" "}
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="p-7 m-auto ">
        <GetProduct product={product} getProduct={getProduct} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(page / 12))}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default page;
