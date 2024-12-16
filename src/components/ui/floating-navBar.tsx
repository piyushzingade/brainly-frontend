"use client";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import toast from "react-hot-toast";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const navigate = useNavigate();

  function logOutHandler() {
    localStorage.removeItem("token");
    toast.success("Logged Out", {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#363636",
        color: "#fff",
      },
    });
    navigate("/");
  }

  return (
    <div
      className={cn(
        "flex fixed top-0 left-0 right-0 mx-auto   max-w-fit  mt-4 border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-md z-50 px-8 py-2 items-center justify-center gap-5 ",
        className
      )}
    >
      {navItems.map((navItem: any, idx: number) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative flex items-center space-x-1 text-neutral-600 dark:text-neutral-50 hover:text-blue-500 dark:hover:text-blue-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </a>
      ))}

      {!localStorage.getItem("token") ? (
        <div className="flex gap-3">
          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>

          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            <span>Sign Up</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </div>
      ) : (
        <button
          onClick={logOutHandler}
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          <span>Logout</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      )}
    </div>
  );
};
