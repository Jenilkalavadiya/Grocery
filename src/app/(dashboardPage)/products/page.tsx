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
import Image from "next/image";
import icon from "../../../../public/images/search.svg";
import { Button } from "@mui/material";

const page = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(null);
  const [page, setPage] = useState(1);

  const handleChange = (e: any) => {
    const trimmedSearch = e.target.value.trim();
    setSearch(trimmedSearch);
    setPage(1);
  };

  //GET PRODUCT
  const getProduct = async () => {
    const res = await apiRequest({
      method: "get",
      url: `/get_products?pageNumber=${page}&pageLimit=5&search=${search}`,
    });

    console.log("getProduct", res?.data);
    const data = await res?.data?.data;
    setProduct(data);
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
          <h2 className="text-3xl  font-bold !text-[#202020]">Products</h2>
          <div className=" mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"products"}
              className="flex"
            />
          </div>
        </div>

        {/* SEARCH USERS INPUT ***************** */}

        <div className="searchfiled flex gap-3">
          <div className="border border-[#DADDE1] bg-white flex justify-center">
            <div className="flex items-center justify-center ml-3">
              <Image src={icon} alt="pp" width={18} height={15} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Products... "
                value={search}
                onChange={(e) => handleChange(e)}
                className="px-2 focus:outline-none  w-[244px] h-[45px]"
              />
            </div>
          </div>

          <Button
            className="!bg-[#FCC827] !text-black !font-extrabold h-[45px] p-1"
            onClick={() => router.push("/products/addProduct")}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="m-auto mt-3 ">
        <GetProduct product={product} getProduct={getProduct} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(product?.Total_Count / 10))}
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
