"use client";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { dark } from "@clerk/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  return (
    <nav className="topbar ">
      <Link href={"/"} className="flex items-end justify-end gap-3">
        <Image
          src={"/logo.png"}
          alt="twitter-logo"
          width={35}
          height={35}
        ></Image>{" "}
        <p className=" text-light-1 text-heading4-medium hidden md:flex">
          Twitter
        </p>
      </Link>
      <div className="flex justify-center items-center">
        {/* <UserButton
            appearance={{
              baseTheme: dark,
            }}
          /> */}
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
    </nav>
  );
}
