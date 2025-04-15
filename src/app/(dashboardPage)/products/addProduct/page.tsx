"use client";

import { getFunction } from "@/api/ApiCall";
import AddProducts from "@/app/components/AddProducts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [productId, setProductId] = useState<string | null>(null); // New state to store the product id

  // GET CATEGORY ****************
  const getAllCategory = async () => {
    try {
      const res = await getFunction(
        `/getcategories?pageNumber=${page}&pageLimit=5`
      );
      const data = await res?.data?.data?.result;
      setCategory(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
    getbrands();
  }, [page]);

  const getAllSubCategory = async () => {
    try {
      const res = await getFunction(
        "/get_subcategories?pageNumber=1&pageLimit=5"
      );
      const data = await res?.data?.data?.result;
      setSubCategory(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // GET BRANDS ****************
  const getbrands = async () => {
    try {
      const res = await getFunction(
        `/get_brands?pageNumber=${page}&pageLimit=10`
      );
      const data = await res?.data?.data?.result;
      setBrand(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // GET PRODUCT ****************
  const getProduct = async () => {
    const res = await getFunction(`/get_products?pageNumber=1&pageLimit=10`);
    console.log("getProduct", res);
    const data = await res?.data?.data?.result;
  };

  const searchParams = useSearchParams();
  const search = searchParams.get("id"); 
  console.log("id", search); 
  useEffect(() => {
    if (search) {
      setProductId(search); 
    }
  }, [search]); 

  return (
    <div className="max-w-[1400px] mt-2 m-auto p-2">
      <AddProducts
        brand={brand}
        category={category}
        subCategory={subCategory}
        getProduct={getProduct}
        productId={productId} 
      />
    </div>
  );
};

export default AddProduct;
