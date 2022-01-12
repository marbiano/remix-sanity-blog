import { json, useLoaderData, Outlet } from "remix";
import type { HeadersFunction, LoaderFunction } from "remix";
import type { Post } from "~/lib/types";
import { getAllPosts } from "~/lib/client";
import getHeaders from "~/lib/get-headers";
import PostList from "~/components/PostList";

export const loader: LoaderFunction = async () => {
  const posts = await getAllPosts();

  if (!posts) {
    return;
  }

  return json<Post[]>(posts, {
    headers: getHeaders(),
  });
};

export const headers: HeadersFunction = () => {
  // Only until loaderHeaders works properly again: https://github.com/remix-run/remix/issues/1140
  const headers = getHeaders();
  return headers;
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
