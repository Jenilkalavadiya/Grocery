import Loader from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push("/");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    // Optional: show nothing or a loading indicator while checking auth
    if (isAuthenticated === null) return <Loader />;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
