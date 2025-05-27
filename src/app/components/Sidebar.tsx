"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import Grocery from "../../../public/Path 410.png";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import styles from "@/styles/sidebar.module.css";

interface SidebarItem {
  name: string;
  image: string;
  link: string;
  isCategory?: boolean;
}

import DashboardIcon from "../../../public/images/1.svg";
import UsersIcon from "../../../public/images/2.svg";
import ProductsIcon from "../../../public/images/3.svg";
import OrdersIcon from "../../../public/images/4.svg";
import CategoryIcon from "../../../public/images/5.svg";
import BrandsIcon from "../../../public/images/6.svg";
import CouponManagementIcon from "../../../public/images/7.svg";
import HomeManagementIcon from "../../../public/images/8.svg";
import PagesIcon from "../../../public/images/9.svg";
import FAQIcon from "../../../public/images/10.svg";
import MenuIcon from "@mui/icons-material/Menu";

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", image: DashboardIcon, link: "/dashboard" },
  { name: "Users", image: UsersIcon, link: "/users" },
  { name: "Products", image: ProductsIcon, link: "/products" },
  { name: "Orders", image: OrdersIcon, link: "/orders" },
  {
    name: "Category",
    image: CategoryIcon,
    link: "/category",
    isCategory: true,
  },
  { name: "Brands", image: BrandsIcon, link: "/brands" },
  {
    name: "Coupon Management",
    image: CouponManagementIcon,
    link: "/couponmanagment",
  },
  {
    name: "Home Management",
    image: HomeManagementIcon,
    link: "/homemanagement",
  },
  { name: "Pages", image: PagesIcon, link: "/pages" },
  { name: "FAQ", image: FAQIcon, link: "/faq" },
];

const drawerWidth = 325;

interface Props {
  window?: () => Window;
}

const SidebarItem = React.memo(
  ({
    item,
    pathname,
    activeCategory,
    onCategoryToggle,
  }: {
    item: SidebarItem;
    pathname: string;
    activeCategory: string | null;
    onCategoryToggle: (name: string) => void;
  }) => {
    const isActive = item.link === pathname;
    const isCategoryActive = activeCategory === item.name;

    if (item.isCategory) {
      return (
        <div className="flex flex-col">
          <div
            className="flex items-center justify-between px-4 py-3 rounded-md cursor-pointer transition-colors hover:bg-gray-700"
            onClick={() => onCategoryToggle(item.name)}
          >
            <div className="flex items-center gap-3">
              <Image
                className="w-5 h-5"
                width={5}
                height={5}
                src={item.image}
                alt="../../../public/images/1.svg"
              />
              <span
                className={`${isActive ? "text-yellow-400 font-semibold" : "text-gray-300"}`}
              >
                {item.name}
              </span>
            </div>
            <KeyboardArrowDownIcon
              className={`transition-transform duration-200 ${isCategoryActive ? "rotate-180" : ""}`}
              sx={{ color: "gray" }}
            />
          </div>

          {isCategoryActive && (
            <div className="ml-10 mt-2 space-y-2 text-md">
              <Link
                href="/category"
                className={`block px-3 py-2 rounded-md transition hover:bg-gray-700 ${
                  pathname === "/category"
                    ? "text-yellow-400 bg-gray-700"
                    : "text-gray-300"
                }`}
              >
                Category
              </Link>
              <Link
                href="/subcategory"
                className={`block px-3 py-2 rounded-md transition hover:bg-gray-700 ${
                  pathname === "/subcategory"
                    ? "text-yellow-400 bg-gray-700"
                    : "text-gray-300"
                }`}
              >
                Sub Category
              </Link>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        href={item.link}
        className={`${isActive ? "text-yellow-400 font-semibold" : "text-gray-300"}`}
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-700">
          <Image
            className="w-5 h-5"
            width={5}
            height={5}
            src={item.image}
            alt="icon"
          />
          {item.name}
        </div>
      </Link>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export default function ResponsiveDrawer({ window }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();

  const handleDrawerClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleCategoryToggle = useCallback(
    (categoryName: string) => {
      setActiveCategory(activeCategory === categoryName ? null : categoryName);
    },
    [activeCategory]
  );

  const drawer = useMemo(
    () => (
      <div className="bg-gray-800 h-screen">
        <List disablePadding className="bg-gray-800">
          <div className="sticky top-0 z-50 py-4.5">
            <div className="flex items-center ">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="focus:outline-none ml-3 text-yellow-400 cursor-pointer"
              >
                <MenuIcon />
              </button>
              <Link href="#" className="flex items-center ml-8 justify-center">
                <Image src={Grocery} width={150} height={100} alt="Logo" />
              </Link>
            </div>
          </div>

          <ul className="space-y-4 mb-2 overflow-y-auto text-lg font-medium leading-6 max-h-[calc(100vh-80px)] px-4 text-gray-300 cursor-pointer">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <SidebarItem
                  item={item}
                  pathname={pathname}
                  activeCategory={activeCategory}
                  onCategoryToggle={handleCategoryToggle}
                />
              </li>
            ))}
          </ul>
        </List>
      </div>
    ),
    [pathname, activeCategory, handleCategoryToggle]
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: isSidebarOpen ? { xs: "none", sm: "block" } : "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
