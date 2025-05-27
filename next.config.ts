import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images:{
    domains:['192.168.2.181','192.168.2.180',"192.168.2.236"]
  },
    reactStrictMode: false,
};

export default withFlowbiteReact(nextConfig);
