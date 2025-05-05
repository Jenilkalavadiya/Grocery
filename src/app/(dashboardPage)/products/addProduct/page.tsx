"use client";

import { apiRequest } from "@/api/ApiCall";
import AddProducts from "@/app/components/AddProducts";
import withAuth from "@/protected/withAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  No: number;
  Category_Name: string;
}

interface SubCategory {
  No: number;
  SubCategory_Name: string;
}

interface Brand {
  No: number;
  Brand_Name: string;
}

interface ProductDetail {
  Product_id: string;
  Product_Name: string;
  Variation: string;
  Product_Price: string;
  Discount: string;
  Discount_Price: string;
  Stock_Status: number;
  Title: string;
  Description: string;
  Image: string;
}

interface SelectBox {
  Category_id: number;
  SubCategory_id: number;
  Brand_id: number;
}

const AddProduct = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  console.log("serach", search);
  useEffect(() => {
    if (search) {
      setProductId(search);
    }
  }, [search]);

  const [category, setCategory] = useState<Category[]>([]);
  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);
  const [productId, setProductId] = useState<string | null>(null);
  const [newProductId, setNewProductId] = useState<string | null>(null);
  const [getProductDetail, setGetProductDetail] =
    useState<ProductDetail | null>(null);
  const [selectBox, setSelectBox] = useState<SelectBox | null>(null);

  console.log("productId", productId);
  // GET CATEGORY ****************
  const getAllCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/getcategories?pageNumber=1&pageLimit=10`,
      });

      const data = await res?.data?.data?.result;
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
    getbrands();
  }, []);

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
        url: `/get_brands?pageNumber=1&pageLimit=10`,
      });

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
  };

  // GET PRODUCT BY ID
  const getProductById = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_product_by_variation?id=${productId}`,
      });
      console.log("getProductById", res);
      if (res?.data?.code === 1) {
        setGetProductDetail(res?.data?.data?.DATA[0]);
        setNewProductId(res?.data?.data?.DATA[0].Product_id);
        setSelectBox(res?.data?.data?.result[0]);
      }
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  };

  return (
    <div className=" mt-2 m-auto p-2 h-[calc(100vh-110px)]">
      <AddProducts
        brand={brand}
        category={category}
        subCategory={subCategory}
        getProduct={getProduct}
        newProductId={newProductId}
        variationId={productId}
        getProductDetail={getProductDetail}
        selectBox={selectBox}
      />
    </div>
  );
};

export default withAuth(AddProduct);
