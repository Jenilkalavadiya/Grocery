import Loader from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";

interface WithoutAuthProps {
  [key: string]: unknown;
}

const withoutAuth = <P extends WithoutAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  const WithoutAuthComponent = (props: P) => {
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

  WithoutAuthComponent.displayName = `withoutAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithoutAuthComponent;
};

export default withoutAuth;
