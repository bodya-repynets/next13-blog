"use client";
import { useGlobalContext } from "@/app/context";
import { auth, provider } from "@/app/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { user, setUser } = useGlobalContext();
  const signIn = async () => {
    try {
      const resp = await signInWithPopup(auth, provider);
      setUser(resp.user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="justify-around h-[80px] bg-gradient-to-r from-zinc-600 to-zinc-700 items-center flex w-screen">
      <Link className="p-2" href="/">
        Blog App
      </Link>
      <div className="flex gap-[20px] md:gap-[40px]">
        <Link
          className={`${
            pathname == "/" && "underline underline-offset-8"
          } p-2 hover:scale-110 duration-100 rounded`}
          href="/"
        >
          Posts
        </Link>
        {user && (
          <Link
            className={`${
              pathname == "/profile" && "underline underline-offset-8"
            } p-2 hover:scale-110 duration-100 rounded`}
            href={"/profile"}
          >
            Profile
          </Link>
        )}
        {!user && (
          <button
            className="py-2 p-2 hover:scale-110 duration-100 rounded`"
            onClick={signIn}
          >
            Sing in with Google
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
