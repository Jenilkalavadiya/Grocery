"use client";

import Loader from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ComponentType } from "react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
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

  WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithAuthComponent;
};

export default withAuth;
