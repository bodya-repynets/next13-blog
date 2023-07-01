"use client";

import { useGlobalContext } from "@/app/context";
import { db } from "@/app/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const router = useRouter();
  const { posts } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const [message, setMessage] = useState(false);
  const handleClick = async () => {
    if (title.length > 10 && text.length > 50) {
      try {
        await updateDoc(doc(db, "posts", params.id), {
          title: title,
          text: text,
          time: new Date(),
        });
        setTitle("");
        setText("");
        router.push(`/posts/${params.id}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErr("Invalid data");
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
    setMessage(false);
  };
  useEffect(() => {
    const post = posts.find((post) => post.id === params.id);
    if (post) {
      setTitle(post.title);
      setText(post.text);
    }
  }, [posts]);
  return (
    <>
      <div
        className={`absolute w-screen h-screen bg-black opacity-30 ${
          message ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`flex flex-col gap-16 items-center justify-center mt-[80px] mx-2`}
      >
        <div
          className={`absolute bg-black border-green-500 border-2 p-[30px] space-y-8  ${
            message ? "block" : "hidden"
          }`}
        >
          <p className="text-white">Are you sure, that you want edit?</p>
          <div className="w-full flex justify-around">
            <button
              onClick={handleClick}
              className="bg-yellow-300 p-2 w-[100px] rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => setMessage(false)}
              className="bg-red-300 p-2 w-[100px] rounded hover:bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
        <h2 className="text-center text-2xl">Edit post</h2>
        <div className="flex flex-col gap-8 w-full items-center">
          {err && <p className="bg-red-500 p-1 rounded">{err}</p>}
          <div className="w-full md:w-3/4 lg:w-1/2">
            <input
              maxLength={40}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`border-2 w-full h-12 px-4 ${
                err && "border-red-500"
              } rounded`}
            ></input>
            <p
              className={`text-center ${
                title.length > 9 ? "text-green-500" : "text-red-500"
              } text-xs pt-2`}
            >
              {title.length}/50
            </p>
          </div>
          <div className="w-full md:w-3/4 lg:w-1/2">
            <textarea
              maxLength={1000}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Text"
              className={`border-2 w-full py-2 px-4 h-48 ${
                err && "border-red-500"
              } rounded m-0`}
            ></textarea>
            <p
              className={`text-center ${
                text.length > 49 ? "text-green-500" : "text-red-500"
              } text-xs`}
            >
              {text.length}/1000
            </p>
          </div>
          <button
            onClick={() => setMessage(true)}
            className="rounded bg-green-300 w-60 py-2 hover:bg-green-400"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};
export default page;
