"use client";

import { useEffect } from "react";
import { useGlobalContext } from "../context";
import Post from "@/components/Post";

const PostsPage = ({ children }) => {
  const { posts } = useGlobalContext();
  return (
    <div className="flex flex-wrap gap-8 my-[40px] justify-center">
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};
export default PostsPage;
