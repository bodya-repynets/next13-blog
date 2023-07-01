import moment from "moment";
import Link from "next/link";

const Post = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
    <div className="flex flex-col gap-4 w-[300px] border-b-2 pb-4 justify-between bg-gray-100 p-2 rounded h-full hover:scale-110 duration-500 shadow-xl">
      <div className="flex justify-between">
        <span className="text-xs text-gray-500">{moment(new Date(post.time.seconds*1000)).format('HH:mm')}</span>
        <span className="text-xs text-gray-500">{moment(new Date(post.time.seconds*1000)).format('DD.MM.YYYY')}</span>
      </div>
      <p className="text-xl text-gray-800 tracking-wide capitalize text-center">{post.title}</p>
      <p className="text-center">{post.text.slice(0, 50)}...</p>
      <p className="text-center text-green-500 text-sm">{post.author}</p>
    </div>
    </Link>
  );
};
export default Post;
