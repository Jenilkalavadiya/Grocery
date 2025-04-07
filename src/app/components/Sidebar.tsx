"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
    name: "Coupen Management",
    image: "./images/7.svg",
    link: "/coupenmanagement",
  },
  { name: "Home Management", image: "./images/8.svg", link: "/homemanagement" },
  { name: "Pages", image: "./images/9.svg", link: "/pages" },
  { name: "FAQ", image: "./images/10.svg", link: "/faq" },
];

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState(null);
  const pathname = usePathname();

  const handleCategoryToggle = (categoryName: any) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className="sticky top-0 left-0 z-40 w-[300px] h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full py-6 bg-gray-50 dark:bg-[#202020]">
          {/* Logo section */}
          <div className="mb-10 sticky top-0 z-50 bg-gray-50 dark:bg-[#202020]">
            <Link href="#" className="flex items-center justify-center">
              <img src="./Path 410.png" alt="Logo" />
            </Link>
          </div>

          {/* Sidebar items */}
          <ul className="space-y-6 overflow-y-auto text-xl leading-12 h-[calc(100vh-150px)]">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                {item.isCategory ? (
                  <div className="flex flex-col">
                    <div
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => handleCategoryToggle(item.name)}
                    >
                      <img className="ml-5" src={item.image} alt="" />
                      <span
                        className={`${
                          item.link === pathname
                            ? "text-yellow-200"
                            : "text-white"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    {activeCategory === item.name && (
                      <div className="ml-8 mt-2">
                        <Link
                          href="/category"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Category
                        </Link>
                        <Link
                          href="/subcategory"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Sub Category
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-row gap-4 border-b border-b-[#353737]">
                    <img className="ml-5" src={item.image} alt="" />
                    <Link
                      href={item.link}
                      className={`${
                        item.link === pathname
                          ? "text-yellow-200"
                          : "text-white"
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
      </aside>
    </div>
  );
}
