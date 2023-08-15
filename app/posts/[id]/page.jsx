"use client";
import moment from "moment";
import { useGlobalContext } from "@/app/context";
import { db } from "@/app/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const SinglePostPage = ({ params }) => {
  const router = useRouter();

  const { posts, user } = useGlobalContext();
  const post = posts.find((post) => post.id === params.id);

  return (
    <>
      {post && (
        <div className="flex flex-col gap-8 sm:w-3/4 mx-auto justify-between bg-gradient-to-r from-zinc-600 to-zinc-700 p-10 sm:rounded my-[20px] sm:my-[40px]">
          <div className="flex justify-between">
            <span className="text-[12px] tracking-[2px] font-semibold text-teal-300">
              {moment(new Date(post.time.seconds * 1000)).format("HH:mm")}
            </span>
            <span className="text-[12px] tracking-[2px] font-semibold text-teal-300">
              {moment(new Date(post.time.seconds * 1000)).format("DD.MM.YYYY")}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-[40px]">
            <img className="w-[300px]" src={post.url} alt="image" />
            <div className="flex flex-col gap-[40px]">
              <p className="text-[18px] tracking-[2px] font-semibold capitalize text-center">
                {post.title}
              </p>
              <p className="text-[14px] tracking-[2px]">{post.text}</p>
              <p className="text-center text-[14px] text-teal-300 tracking-[2px]">
                {post.author}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SinglePostPage;
