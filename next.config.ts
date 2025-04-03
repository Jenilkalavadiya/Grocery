import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images:{
    domains:['192.168.2.181']
  }
};

export default withFlowbiteReact(nextConfig);