import { LoaderFunction, useLoaderData } from "remix";
import { Outlet } from "remix";
import PostList from "~/components/PostList";
import { getAllPosts } from "~/lib/client";
import type { Post } from "~/lib/types";

export const loader: LoaderFunction = () => {
  return getAllPosts();
};

export default function Posts() {
  const posts: Post[] = useLoaderData();

  return (
    <div>
      <PostList posts={posts} />
      <Outlet />
    </div>
  );
}
