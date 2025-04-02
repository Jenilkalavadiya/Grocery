"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Dashboard", image: "./images/1.svg", link: "/dashboard" },
  { name: "Users", image: "./images/2.svg", link: "/users" },
  { name: "Products", image: "./images/3.svg", link: "/products" },
  { name: "Orders", image: "./images/4.svg", link: "/orders" },
  { name: "Category", image: "./images/5.svg", link: "/category" },
  { name: "Brands", image: "./images/6.svg", link: "/brands" },
  { name: "Coupen Management", image: "./images/7.svg", link: "/brands" },
  { name: "Home Management", image: "./images/8.svg", link: "/brands" },
  { name: "Pages", image: "./images/9.svg", link: "/brands" },
  { name: "FAQ", image: "./images/10.svg", link: "/brands" },
];

const handleClick = () => {};

export default function Sidebar({}) {
  const pathname = usePathname();
  console.log("pathhhh", pathname);
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
        <div className="h-full py-6 overflow-y-auto bg-gray-50 dark:bg-[#202020] ">
          <div className="mb-10 mt-2">
            <Link href="#" className="flex justify-center">
              <img src="./Path 410.png" alt="" />
            </Link>
          </div>
          <ul className="space-y-6 text-xl leading-12">
            {sidebarItems.map((item, index) => (
              <li
                className="flex flex-row gap-4 border-b border-b-[#353737] "
                key={index}
              >
                <img
                  onClick={handleClick}
                  className="ml-5"
                  src={item.image}
                  alt=""
                />
                <Link
                  onClick={handleClick}
                  href={item.link}
                  className={`${
                    item.link == pathname ? "text-yellow-200" : null
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

// {sidebarItems.map((item, index) => (
// <li className="flex flex-row" key={index}>
//   <img src={item.image} alt="" className="ml-3" />
//   <Link onClick={handleClick} href={item.link}>
//     {item.name}
//   </Link>
//   {/* <hr className="text-white "/> */}
//   <div className="border-b border-b-gray-[#878F92] w-full overflow-hidden !p-0"></div>
// </li>}
