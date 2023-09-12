"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  TbBell,
  TbFeather,
  TbSmartHome,
  TbUser,
  TbUsers,
} from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";

export default function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="fixed flex-col bottom-0 z-10 lg:hidden w-full gap-3">
      <section className="flex justify-end items-end p-3">
        <Link
          href={"/create-tweet"}
          className={` text-white p-4 rounded-full w-fit 
        flex
        lg:hidden
        bg-blue 
        hover:bg-sky-600
          ${pathname === "/create-tweet" ? "hidden" : ""}`}
        >
          <TbFeather className="text-[25px] shrink-0 " />
        </Link>
      </section>

      <section className="bottombar">
        <div className="bottombar_container">
          {sidebarLinks.map((v) => {
            const isActive =
              (pathname.includes(v.route) && v.route.length > 1) ||
              pathname === v.route;
            return (
              <Link
                href={v.route}
                key={v.label}
                className={`bottombar_link ${isActive && ` bg-blue`}`}
              >
                <p className=" text-light-2 text-[25px]">
                  {v.label === "Home" ? (
                    <TbSmartHome />
                  ) : v.label === "Search" ? (
                    <IoSearchSharp />
                  ) : v.label === "Notification" ? (
                    <TbBell />
                  ) : v.label === "Communities" ? (
                    <TbUsers />
                  ) : (
                    <TbUser />
                  )}
                </p>{" "}
                <p className="text-subtle-medium text-light-1 max-sm:hidden">
                  {v.label.split(/\s+/)[0]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
