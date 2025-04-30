import { useRouter } from "next/navigation";
import { useEffect } from "react";


const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const isAuthenticated =
      typeof window !== "undefined" && localStorage.getItem("auth_token");

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
