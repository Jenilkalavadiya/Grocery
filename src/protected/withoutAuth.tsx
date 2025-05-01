import Loader from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withoutAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        router.push("/dashboard");
      } else {
        setIsLoading(false); // Allow access
      }
    }, []);

    if (isLoading) return <Loader />; // or loading spinner

    return <WrappedComponent {...props} />;
  };
};

export default withoutAuth;
