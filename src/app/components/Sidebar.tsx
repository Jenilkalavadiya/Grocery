"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Grocery from "../../../public/Path 410.png";
import Image from "next/image";
import styles from "@/styles/sidebar.module.css";
const sidebarItems = [
  { name: "Dashboard", image: "./images/1.svg", link: "/dashboard" },
  { name: "Users", image: "./images/2.svg", link: "/users" },
  { name: "Products", image: "./images/3.svg", link: "/products" },
  { name: "Orders", image: "./images/4.svg", link: "/orders" },
  {
    name: "Category",
    image: "./images/5.svg",
    link: "/category",
    isCategory: true,
  },
  { name: "Brands", image: "./images/6.svg", link: "/brands" },
  {
    name: "Coupon Management",
    image: "./images/7.svg",
    link: "/couponmanagment",
  },
  { name: "Home Management", image: "./images/8.svg", link: "/homemanagement" },
  { name: "Pages", image: "./images/9.svg", link: "/pages" },
  { name: "FAQ", image: "./images/10.svg", link: "/faq" },
];

const drawerWidth = 325;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [activeCategory, setActiveCategory] = useState(null);
  const pathname = usePathname();

  const handleCategoryToggle = (categoryName: any) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };
  const drawer = (
    <div>
      <List className={` !p-0 !m-0 `}>
        <div className="min-h-screen py-6 bg-gray-800">
          {/* Logo */}
          <div className="mb-8 sticky top-0 z-50 bg-gray-800">
            <Link href="#" className="flex items-center justify-center">
              <Image src={Grocery} width={150} height={100} alt="Logo" />
            </Link>
          </div>

          {/* Sidebar Items */}
          <ul className="space-y-4 overflow-y-auto text-lg font-medium leading-6 h-[calc(100vh-150px)] px-4 text-gray-300">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                {item.isCategory ? (
                  <div className="flex flex-col">
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-colors hover:bg-gray-700"
                      onClick={() => handleCategoryToggle(item.name)}
                    >
                      <img className="w-5 h-5" src={item.image} alt="" />
                      <span
                        className={`${
                          item.link === pathname
                            ? "text-yellow-400 font-semibold"
                            : "text-gray-300"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    {activeCategory === item.name && (
                      <div className="ml-10 mt-2 space-y-2 text-sm">
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
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-700">
                    <img className="w-5 h-5" src={item.image} alt="icon" />
                    <Link
                      href={item.link}
                      className={`${
                        item.link === pathname
                          ? "text-yellow-400 font-semibold"
                          : "text-gray-300"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
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
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
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
