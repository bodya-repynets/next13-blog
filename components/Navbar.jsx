"use client";
import { useGlobalContext } from "@/app/context";
import { auth, provider } from "@/app/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname=usePathname()
  const { user, setUser } = useGlobalContext();
  const [clicked, setClicked]=useState(false)
  const signIn = async () => {
    try {
      const resp = await signInWithPopup(auth, provider);
      setUser(resp.user);
    } catch (err) {
      console.log(err);
    }
  };
  const logOut = async () => {
    setClicked(!clicked)
    await signOut(auth);
  };
  return (
    <div className="justify-around h-20 items-center  flex w-screen">
      <Link className="py-2 hover:text-gray-400" href="/">
        Blog App
      </Link>
      <div className="flex gap-8">
        <Link className={`${pathname=='/posts'&&'underline underline-offset-8'} p-2 hover:text-gray-400 rounded`} href="/posts">
          Posts
        </Link>
        {user && (
          <Link className={`${pathname=='/posts/create'&&'underline underline-offset-8'} p-2 hover:text-gray-400 rounded`} href={"/posts/create"}>
            Create Post
          </Link>
        )}
        {!user &&(
          <button className="py-2" onClick={signIn}>
            Sing in with Google
          </button>
        )}
        {user && 
        <div className="relative w-10 h-10">
          <button onClick={()=>setClicked(!clicked)}>
            <img
              className="h-10 w-10 rounded"
              src={user.photoURL}
            ></img>
          </button>
          <div onMouseLeave={()=>setClicked(!clicked)} className={clicked?'absolute block min-w-[250px] rounded right-0':'absolute hidden'}>
            <ul>
              <li className="text-center py-4 bg-green-200 hover:bg-green-400"><Link className="" onClick={()=>setClicked(!clicked)} href={'/posts/myposts'}>My posts</Link></li>
              <li className="text-center py-4 bg-green-200 hover:bg-green-400"><button onClick={logOut}>Log out</button></li>
              <li className="text-center text-sm p-2 bg-gray-300">{user.email}</li>
            </ul>
          </div>

          </div>
        }
      </div>
    </div>
  );
};
export default Navbar;
