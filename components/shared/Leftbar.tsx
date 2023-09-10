"use client";
import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import {
  TbFeather,
  TbHeart,
  TbSmartHome,
  TbUser,
  TbUsers,
  TbZoomFilled,
} from "react-icons/tb";

export default function Leftbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className=" custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((v) => {
          const isActive =
            (pathname.includes(v.route) && v.route.length > 1) ||
            pathname === v.route;

          if (v.route === "/profile") {
            v.route = `${v.route}/${userId}`;
          }

          return (
            <Link
              href={v.route}
              key={v.label}
              className={`leftsidebar_link hover:bg-white/10 transition-all ease-out duration-500
                ${isActive && " text-base-semibold"}`}
            >
              {/* <Image src={v.imgURL} alt={v.label} width={24} height={24} /> */}
              <p className=" text-light-2 text-[25px]">
                {v.label === "Home" ? (
                  <TbSmartHome />
                ) : v.label === "Search" ? (
                  <TbZoomFilled />
                ) : v.label === "Activity" ? (
                  <TbHeart />
                ) : v.label === "Create Tweet" ? (
                  <TbFeather />
                ) : v.label === "Communities" ? (
                  <TbUsers />
                ) : (
                  <TbUser />
                )}
              </p>
              <p className=" text-light-1 max-lg:hidden">{v.label}</p>
            </Link>
          );
        })}

        <Link
          href={"/create-tweet"}
          className={` text-white bg-blue p-4 flex gap-2 rounded-full items-center first-letter 
          ${pathname === "/create-tweet" ? " text-base-semibold" : ""}`}
        >
          <TbFeather className="text-[25px]" /> Create Tweet
        </Link>

        {/* <UserButton /> */}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <p className=" text-light-1 max-lg:hidden">Logout</p>
              <HiOutlineLogout className=" text-white sm:text-heading3-bold" />
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}
