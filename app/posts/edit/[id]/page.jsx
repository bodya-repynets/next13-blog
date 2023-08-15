"use client";

import { useGlobalContext } from "@/app/context";
import { db, storage } from "@/app/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

const page = ({ params }) => {
  const router = useRouter();
  const { posts } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState(false);
  const handleClick = async () => {
    if (title.length > 10 && text.length > 50) {
      try {
        if (image) {
          const imageRef = ref(storage, `${image.name.slice(0, -5)}${v4()}`);
          const resp = await uploadBytes(imageRef, image);
          const link = await getDownloadURL(ref(imageRef));
          await deleteObject(ref(storage, name));
          await updateDoc(doc(db, "posts", params.id), {
            url: link,
            name: resp.metadata.name,
            title: title,
            text: text,
            time: new Date(),
          });
        } else {
          await updateDoc(doc(db, "posts", params.id), {
            title: title,
            text: text,
            time: new Date(),
          });
        }
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
      setUrl(post.url);
      setName(post.name);
      setTitle(post.title);
      setText(post.text);
    }
  }, [posts]);
  return (
    <>
      <div className="flex flex-col gap-16 items-center justify-center mt-[80px] mx-[50px]">
        <div className="flex flex-col gap-[40px] w-full items-center">
          {err && <p className="bg-red-500 p-1 rounded">Invalid data!</p>}
          <div className="w-full md:w-3/4 lg:w-1/2">
            <input
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`focus:outline-none text-zinc-600 bg-transparent border-2 border-zinc-600 focus:border-dashed w-full h-[50px] px-4 ${
                err && "border-red-500"
              } rounded`}
            ></input>
            <p
              className={`text-center ${
                title.length > 9 ? "text-teal-600" : "text-rose-600"
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
              className={`focus:outline-none placeholder:text-white py-4 text-zinc-600 bg-transparent border-2 border-zinc-600 focus:border-dashed w-full h-[200px] px-4 ${
                err && "border-red-500"
              } rounded`}
            ></textarea>
            <p
              className={`text-center ${
                text.length > 49 ? "text-teal-600" : "text-rose-600"
              } text-xs`}
            >
              {text.length}/1000
            </p>
          </div>
          <div className="w-full md:w-3/4 lg:w-1/2">
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              className="block text-sm text-zinc-700
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-zinc-600 hover:file:cursor-pointer hover:cursor-pointer file:text-white
        hover:file:bg-pink-100"
            />
          </div>
          <button
            onClick={() => setMessage(true)}
            className="rounded bg-teal-600 hover:bg-teal-500 tracking-[3px] font-semibold w-[200px] h-[50px]"
          >
            Edit
          </button>
        </div>
      </div>
      <div
        className={`absolute w-screen  bg-black bg-opacity-50 h-screen ${
          message ? "block" : "hidden"
        } flex items-center justify-center`}
      >
        <div
          className={`bg-gradient-to-r border-4 rounded-xl border-teal-600 from-zinc-600 to-zinc-700 p-[100px] flex flex-col items-center gap-[50px] ${
            message ? "block" : "hidden"
          }`}
        >
          <p className="text-white">Confirm edition</p>
          <div className="w-full flex justify-around gap-[40px]">
            <button
              onClick={handleClick}
              className="bg-teal-600 hover:bg-teal-500 p-2 w-[100px] rounded"
            >
              Edit
            </button>
            <button
              onClick={() => setMessage(false)}
              className="bg-rose-600 hover:bg-rose-500 p-2 w-[100px] rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
