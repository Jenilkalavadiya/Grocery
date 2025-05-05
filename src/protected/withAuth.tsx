import Loader from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";

interface WithAuthProps {
  [key: string]: unknown;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
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
