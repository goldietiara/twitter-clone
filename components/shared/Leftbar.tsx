"use client";
import { sidebarLinks } from "@/constants";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  useAuth,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import {
  TbBell,
  TbFeather,
  TbSmartHome,
  TbUser,
  TbUsers,
} from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";

export default function Leftbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className=" custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-2 px-6">
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
              </p>
              <p className=" text-light-1 max-lg:hidden">{v.label}</p>
            </Link>
          );
        })}

        <Link
          href={"/create-tweet"}
          className={` text-white bg-blue py-4 px-8 flex gap-4 rounded-full items-center first-letter
          ${pathname === "/create-tweet" ? " text-base-semibold" : ""}`}
        >
          <TbFeather className="text-[25px] " /> Post
        </Link>

        {/* <UserButton /> */}
      </div>

      <div className="flex justify-center items-center mt-8">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
          hidePersonal={true}
        ></OrganizationSwitcher>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className=" cursor-pointer p-[11px] rounded-md hover:bg-white/5">
              <HiOutlineLogout className=" text-white/20 text-heading3-bold" />
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}
