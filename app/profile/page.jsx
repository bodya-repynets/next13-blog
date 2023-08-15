"use client";

import { useGlobalContext } from "../context";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import MyPost from "@/components/MyPost";
import { useEffect } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { user, userPosts } = useGlobalContext();
  const logOut = async () => {
    await signOut(auth);
    router.push("/");
  };
  useEffect(() => {
    if (!user) {
      alert("You are not authenticated");
      redirect("/");
    }
  }, [user]);
  return (
    <div className="flex flex-col p-[40px] gap-[40px]">
      <div className="flex flex-col lg:flex-row p-[20px] justify-between items-center h-[200px] sm:h-[140px] lg:h-[80px] bg-gradient-to-r from-zinc-600 to-zinc-700 rounded">
        <p className="tracking-[2px] font-semibold h-[40px] flex items-center justify-center">
          {user.email}
        </p>
        <div className="flex flex-col sm:flex-row gap-[20px]">
          <button
            onClick={() => router.push("/posts/create")}
            className="h-[40px] w-[200px] bg-teal-600 hover:bg-teal-500 text-white rounded"
          >
            Add new post
          </button>
          <button
            className="h-[40px] w-[200px] bg-teal-600 hover:bg-teal-500 text-white rounded"
            onClick={logOut}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex flex-wrap gap-[40px] justify-center">
          {userPosts.map((post) => {
            return (
              <MyPost
                key={post.id}
                id={post.id}
                url={post.url}
                time={post.time}
                title={post.title}
                name={post.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
