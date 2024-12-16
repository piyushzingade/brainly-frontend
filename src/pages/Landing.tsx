

import { FaHome, } from "react-icons/fa";

import { FloatingNav } from "../components/ui/floating-navBar";

import { GoogleGeminiEffectDemo } from "../components/shadcn/GoogleGemini";
import { BentoGridThirdDemo } from "../components/shadcn/BentoGrid";
import { MdSpaceDashboard } from "react-icons/md";

export function LandingPage(){
    const navItems = [
        {
          name: "Home",
          link: "/",
          icon: <FaHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: <MdSpaceDashboard className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        // {
        //   name: "Contact",
        //   link: "/contact",
        //   icon: (
        //     <FaMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
        //   ),
        // },
      ];


// <div class="bg-gradient-to-r from-cyan-500 to-blue-500 ..."></div>
    return (
      <div className="bg-black w-full ">
        <div className="fixed">
          <FloatingNav navItems={navItems} />
        </div>

        <GoogleGeminiEffectDemo />

        <div className="bg-black min-h-screen mt-[10px]">
          <div className=" p-8">
            <BentoGridThirdDemo />
          </div>
          {/* <ThreeDCardDemo/> */}
        </div>
      </div>
    );
}