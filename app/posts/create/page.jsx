"use client";

import { useGlobalContext } from "@/app/context";
import { db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const CreatePage = () => {
  const router = useRouter();
  const { user } = useGlobalContext();
  if (!user) {
    redirect("/posts");
  }
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const handleClick = async () => {
    if (title.length > 10 && text.length > 50) {
      try {
        await addDoc(collection(db, "posts"), {
          title: title,
          text: text,
          author: user.email,
          userId: user.uid,
          time: new Date(),
        });
        setTitle("");
        setText("");
        router.push("/posts");
      } catch (err) {
        console.log(err);
      }
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
    setMessage(false);
  };
  return (
    <>
      <div
        className={`absolute w-screen  bg-black opacity-30 h-screen ${
          message ? "block" : "hidden"
        }`}
      ></div>
      <div className="flex flex-col gap-16 items-center justify-center mt-[80px] mx-2">
        <div
          className={`absolute bg-black border-green-500 border-2 p-[30px] space-y-8  ${
            message ? "block" : "hidden"
          }`}
        >
          <p className="text-white">Are you sure, that you want post?</p>
          <div className="w-full flex justify-around">
            <button
              onClick={handleClick}
              className="bg-green-300 p-2 w-[100px] rounded hover:bg-green-500"
            >
              Post
            </button>
            <button
              onClick={() => setMessage(false)}
              className="bg-red-300 p-2 w-[100px] rounded hover:bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
        <h2 className="text-center text-2xl">Create post</h2>
        <div className="flex flex-col gap-8 w-full items-center">
          {err && <p className="bg-red-500 p-1 rounded">Invalid data!</p>}
          <div className="w-full md:w-3/4 lg:w-1/2">
            <input
              maxLength={50}
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
              className={`border-2 w-full py-4 px-8 h-[300px] resize-none ${
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
            Publish
          </button>
        </div>
      </div>
    </>
  );
};
export default CreatePage;
