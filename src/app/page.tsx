import Image from "next/image";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from './(auth)/Login'

export default function Home() {
  return (
    <div>
      <Login/>
    </div>
  );
}
