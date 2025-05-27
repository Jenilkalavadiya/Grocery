"use client";

import { apiRequest } from "@/api/ApiCall";

export const getUsers = async ({ page, search }) => {
  try {
    const res = await apiRequest({
      method: "get",
      url: `/getusers?pageNumber=${page}&pageLimit=5&search=${search}`,
    });
    return res?.data?.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// USER DETILAS **************************

export const getUserDetails = async (id: string) => {
  try {
    const res = await apiRequest({
      method: "get",
      url: `/get_user_details?id=${id}`,
    });

    return res?.data?.data?.result[0]; 
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};


