/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import SignInModal from "./SignInModal";
import {
  BellIcon,
  PencilSquareIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      setOpen(true);
    }
  };

  // Optional: avoid flicker while loading session
  if (status === "loading") return null;

  return (
    <>
      <header className="flex justify-between items-center p-4 mx-auto max-w-7xl">
        {/* LEFT */}
        <div className="flex items-center space-x-6">
          <Link href="/">
            <img
              className="w-32 cursor-pointer"
              src="https://links.papareact.com/yvf"
              alt="logo"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/about" onClick={handleProtectedClick}>
              About
            </Link>

            <Link href="/contact" onClick={handleProtectedClick}>
              Contact
            </Link>

            <button
              onClick={handleProtectedClick}
              className="bg-green-600 text-white px-3 py-1 rounded-full"
            >
              Follow
            </button>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-5">
          {/* WRITE */}
          <Link
            href="/write"
            onClick={handleProtectedClick}
            className="flex items-center space-x-1 text-sm font-medium"
          >
            <PencilSquareIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Write</span>
          </Link>

          {/* NOTIFICATIONS */}
          <Link
            href="/notifications"
            onClick={handleProtectedClick}
            className="relative"
          >
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              2
            </span>
          </Link>

          {/* AUTH AREA */}
          {!session ? (
            <>
              <button onClick={() => setOpen(true)} className="text-sm">
                Sign In
              </button>

              <button
                onClick={() => setOpen(true)}
                className="border px-4 py-1 rounded-full border-green-600 text-green-600"
              >
                Get Started
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              {session.user?.image ? <img
                src={session.user?.image || "https://i.pravatar.cc/40"}
                alt="user"
                className="w-8 h-8 rounded-full"
              /> : null}

              {/* Power (Logout) Icon */}
              <button
                onClick={() => signOut()}
                className="p-2 rounded-full hover:bg-gray-200 transition"
                title="Sign Out"
              >
                <PowerIcon className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </header>

      <SignInModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Header;