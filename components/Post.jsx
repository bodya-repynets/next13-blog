import moment from "moment";
import Link from "next/link";

const Post = ({ id, url, time, title, text, author }) => {
  return (
    <Link href={`/posts/${id}`}>
      <div className="flex flex-col gap-4 w-[300px] h-[500px] pb-4 justify-between bg-gradient-to-r from-zinc-600 to-zinc-700 p-2 rounded hover:scale-110 duration-500 shadow-xl overflow-hidden">
        <img className="h-[60%] object-cover" src={url} alt="image" />
        <div className="flex justify-between">
          <span className="text-[10px] tracking-wider text-teal-300">
            {moment(new Date(time.seconds * 1000)).format("HH:mm")}
          </span>
          <span className="text-[10px] tracking-wider text-teal-300">
            {moment(new Date(time.seconds * 1000)).format("DD.MM.YYYY")}
          </span>
        </div>
        <p className="font-semibold px-[10px] tracking-wider capitalize text-center">
          {title}
        </p>
        <p className="text-center px-[10px] text-[12px] tracking-wider overflow-hidden">
          {text.slice(0, 50)}...
        </p>
        <p className="text-center text-[10px] text-teal-300 tracking-wider">
          {author}
        </p>
      </div>
    </Link>
  );
};
export default Post;
