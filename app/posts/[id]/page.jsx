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
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    console.log('delete')
    router.push('/posts')
  };
  return (
    <>
      {post && (
        <div className="flex flex-col gap-8 w-3/4 mx-auto border-b-2 pb-4 justify-between bg-gray-100 p-10 rounded my-[40px]">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">
              {moment(new Date(post.time.seconds * 1000)).format("HH:mm")}
            </span>
            <span className="text-xs text-gray-500">
              {moment(new Date(post.time.seconds * 1000)).format("DD.MM.YYYY")}
            </span>
          </div>
          <p className="text-xl text-gray-800 tracking-wide capitalize text-center">
            {post.title}
          </p>
          <p className="text-center">{post.text}</p>
          <p className="text-center text-green-500">{post.author}</p>
          {user?.uid === post.userId && (
            <div className="flex justify-evenly pb-8">
              <button
                onClick={() => router.push(`/posts/edit/${post.id}`)}
                className="bg-yellow-200 p-4 w-40 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-300 p4 w-40 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default SinglePostPage;
