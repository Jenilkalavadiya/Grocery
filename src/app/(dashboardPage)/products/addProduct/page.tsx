"use client";

import { AddSubCategorySchema } from "@/_components/Validation";
import { apiRequest } from "@/api/ApiCall";
import AddProducts from "@/app/components/AddProducts";
import withAuth from "@/protected/withAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  useEffect(() => {
    if (search) {
      setProductId(search);
    }
  }, [search]);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [productId, setProductId] = useState<string | null>(null);
  const [getProductDetail, setGetProductDetail] = useState(null);

  // GET CATEGORY ****************
  const getAllCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/getcategories?pageNumber=${page}&pageLimit=10`,
      });

      const data = await res?.data?.data?.result;
      setCategory(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
    getbrands();
  }, [page]);

  useEffect(() => {
    if (productId) {
      getProductById();
    }
  }, [productId]);

  const getAllSubCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_subcategories?pageNumber=1&pageLimit=10`,
      });

      const data = await res?.data?.data?.result;
      setSubCategory(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // GET BRANDS ****************
  const getbrands = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_brands?pageNumber=${page}&pageLimit=10`,
      });

      console.log("brand", res);
      const data = await res?.data?.data?.result;
      setBrand(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // GET PRODUCT ****************
  const getProduct = async () => {
    const res = await apiRequest({
      method: "get",
      url: `/get_products?pageNumber=1&pageLimit=10`,
    });
    console.log("getProduct", res);
    const data = await res?.data?.data?.result;
  };

  // GET PRODUCT BY ID
  const getProductById = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_product_by_id?id=${productId}`,
      });
      console.log("getProductById", res?.data);
      if (res?.data?.code == 1) {
        setGetProductDetail(res?.data?.data?.DATA[0]);
      }
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  };

  return (
    <div className=" mt-2 m-auto p-2">
      <AddProducts
        brand={brand}
        category={category}
        subCategory={subCategory}
        getProduct={getProduct}
        productId={productId}
        getProductDetail={getProductDetail}
      />
    </div>
  );
};

export default withAuth(AddProduct);
