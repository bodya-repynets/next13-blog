'use client'
import { useGlobalContext } from "@/app/context"
import Post from "@/components/Post"

const MyPostsPage = () => {
    const {user, posts}=useGlobalContext()
  return (
    <div className="flex flex-wrap gap-8 justify-center py-[40px]">
        {posts.filter(post=>post.userId===user.uid).map(post=>{
            return <Post key={post.id} post={post}/>
        })}
    </div>
  )
}
export default MyPostsPage