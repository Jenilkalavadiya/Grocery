import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { usePathname } from "next/navigation";



export default function CustomSeparator({ value1, value2 }: any) {
  const pathname = usePathname();
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={`/${value1}`}
      className={`!text-xl ${pathname === `/${value1}` ? "text-black" : ""}`}
    >
      {value1}
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href={`/${value2}`}
      className={`!text-xl !${pathname === `/${value2}` ? "text-black" : ""}`}
    >
      {value2}
    </Link>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
