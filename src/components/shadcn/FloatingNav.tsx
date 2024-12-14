"use client";


// import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FaHome, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FloatingNav } from "../ui/floating-navBar";

import { ThreeDCardDemo } from "./Card";
export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Hom",
      link: "/",
      icon: <FaHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/about",
      icon: <FaUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <FaMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className=" w-full  bg-black h-screen">
      <FloatingNav navItems={navItems} />
     <ThreeDCardDemo/>
     <ThreeDCardDemo/>
     <ThreeDCardDemo/>
      
    </div>
  );
}
