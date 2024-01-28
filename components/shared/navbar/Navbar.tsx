import Image from "next/image";
import React from "react";
import Theme from "./Theme";
import GlobalSearchBar from "../search/GlobalSearchBar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import MobileNav from "./MobileNavbar";

const Navbar = () => {
  return (
    <nav className="fixed z-50 flex w-full items-center justify-between p-6 sm:px-10">
      <Link href="/" className="flex gap-3">
        <Image
          src="/assets/images/liftlink_logo.png"
          width={30}
          height={30}
          alt="logo"
        />
        <p className="h2-bold text-dark100_light900 max-lg:hidden">
          Lift<span className="text-primary-500">Link</span>
        </p>
      </Link>
      <GlobalSearchBar />
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#5CE1E6",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
