import moment from "moment";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { storage } from "@/app/firebase";
import { deleteObject, ref } from "firebase/storage";

const MyPost = ({ id, url, time, title, name }) => {
  const router = useRouter();
  const deletePost = async (id) => {
    if (name) {
      await deleteObject(ref(storage, name));
    }
    await deleteDoc(doc(db, "posts", id));
    router.push("/profile");
  };
  return (
    <Link href={`/posts/${id}`}>
      <div className="flex flex-col gap-4 w-[200px] h-[300px] relative pb-4 justify-between bg-gradient-to-r from-zinc-600 to-zinc-700 p-2 rounded shadow-xl overflow-hidden hover:scale-110 duration-200">
        <img className="h-[60%] object-cover" src={url} alt="image" />
        <div className="flex justify-between">
          <span className="text-[10px] text-teal-300">
            {moment(new Date(time.seconds * 1000)).format("HH:mm")}
          </span>
          <span className="text-[10px] text-teal-300">
            {moment(new Date(time.seconds * 1000)).format("DD.MM.YYYY")}
          </span>
        </div>
        <p className="font-semibold tracking-wide capitalize text-center">
          {title}
        </p>
        <BiEdit
          onClick={(e) => {
            e.preventDefault();
            router.push(`/posts/edit/${id}`);
          }}
          className="absolute top-0 left-0 bg-zinc-700 w-[30px] h-[30px] hover:cursor-pointer z-10 p-[3px]"
        />
        <AiOutlineDelete
          onClick={(e) => {
            e.preventDefault();
            deletePost(id);
          }}
          className="absolute top-0 right-0 bg-zinc-700 w-[30px] h-[30px] hover:cursor-pointer z-10 p-[3px]"
        />
      </div>
    </Link>
  );
};
export default MyPost;
