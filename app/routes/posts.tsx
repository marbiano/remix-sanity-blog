import { Link, LoaderFunction, useLoaderData } from "remix";
import { Outlet } from "remix";
import PostList from "~/components/PostList";
import createSanityClient from "~/lib/client";
import { indexQuery } from "~/lib/queries";
import type { Post } from "~/lib/types";

export const loader: LoaderFunction = ({ context }): Promise<Post[]> => {
  const client = createSanityClient({ projectId: context.SANITY_PROJECT_ID });
  return client.fetch(indexQuery);
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
