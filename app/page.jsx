import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 my-auto">
      <p className="text-2xl font-semibold tracking-wide text-center w-[400px] md:w-[700px]">
        Explore awesome stories written by another people and also add your to
        our blog website to share your article with our fantastic community
      </p>
      <Link href={'/posts'} className="text-center py-4 text-2xl font-semibold bg-green-200 w-40 rounded-full hover:bg-green-400">
        Check
      </Link>
    </div>
  );
}
