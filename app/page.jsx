"use client";

import { useGlobalContext } from "./context";
import Post from "@/components/Post";

const PostsPage = () => {
  const { posts } = useGlobalContext();
  return (
    <div className="flex flex-wrap gap-8 my-[40px] justify-center">
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            url={post.url}
            id={post.id}
            time={post.time}
            title={post.title}
            text={post.text}
            author={post.author}
          />
        );
      })}
    </div>
  );
};
export default PostsPage;
