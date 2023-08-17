import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { dark } from "@clerk/themes";

export default function Topbar() {
  return (
    <nav className="topbar">
      <Link href={"/"} className="flex items-center gap-4">
        <FaTwitter className=" text-sky-500 shrink-0 sm:text-heading3-bold" />
        <p className=" text-heading3-bold text-light-1 max-xs:hidden">
          Twitter
        </p>
      </Link>
      <div className=" flex items-center gap-1">
        <div className=" block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <HiOutlineLogout className=" text-white sm:text-heading3-bold" />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}
