import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { usePathname } from "next/navigation";

interface CustomSeparatorProps {
  value1: string;
  value2: string;
  value3?: string;
  className?: string; // Optional prop
}

export default function CustomSeparator({
  value1,
  value2,
  value3,
}: CustomSeparatorProps) {
  const pathname = usePathname();
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={`/${value1}`}
      className={`!text-lg ${pathname === `/${value1}` ? "text-black" : ""} capitalize`}
    >
      {value1}
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href={`/${value2}`}
      className={`!text-lg ${pathname === `/${value2}` ? "text-black" : ""} capitalize`}
    >
      {value2}
    </Link>,
  ];

  // Conditionally add value3 if on the UserDetails page
  if (value3) {
    breadcrumbs.push(
      <Link
        underline="hover"
        key="3"
        color="inherit"
        href={`/${value3}`}
        className={`!text-lg ${pathname === `/${value3}` ? "text-black" : ""} capitalize`}
      >
        {value3}
      </Link>
    );
  }

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
