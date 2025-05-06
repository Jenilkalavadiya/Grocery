import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

interface CustomSeparatorProps {
  value1: string;
  value2: string;
  value3?: string;
  className?: string;
}

const CustomSeparator = ({
  value1,
  value2,
  value3,
  className,
}: CustomSeparatorProps) => {
  const pathname = usePathname();

  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={NextLink}
          underline="hover"
          color="inherit"
          href={`/${value1}`}
          className={`!text-lg ${pathname === `/${value1}` ? "text-black" : ""} capitalize ${className}`}
        >
          {value1}
        </Link>
        <Link
          component={NextLink}
          underline="hover"
          color="inherit"
          href={`/${value2}`}
          className={`!text-lg ${pathname === `/${value2}` ? "text-black" : ""} capitalize ${className}`}
        >
          {value2}
        </Link>
        {value3 && (
          <Link
            component={NextLink}
            underline="hover"
            color="inherit"
            href={`/${value3}`}
            className={`!text-lg ${pathname === `/${value3}` ? "text-black" : ""} capitalize ${className}`}
          >
            {value3}
          </Link>
        )}
      </Breadcrumbs>
    </Stack>
  );
};

export default CustomSeparator;
