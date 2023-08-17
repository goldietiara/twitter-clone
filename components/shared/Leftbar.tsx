"use client";
import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";

export default function Leftbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className=" custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((v) => {
          const isActive =
            (pathname.includes(v.route) && v.route.length > 1) ||
            pathname === v.route;

          return (
            <Link
              href={v.route}
              key={v.label}
              className={`leftsidebar_link ${isActive && `bg-sky-500`}`}
            >
              <Image src={v.imgURL} alt={v.label} width={24} height={24} />
              <p className=" text-light-1 max-lg:hidden">{v.label}</p>
            </Link>
          );
        })}
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
