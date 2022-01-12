import { Link, LoaderFunction, useLoaderData } from "remix";
import { Outlet } from "remix";
import PostList from "~/components/PostList";
import createSanityClient from "~/lib/client";
import getEnv from "~/lib/get-env";
import { indexQuery } from "~/lib/queries";
import type { Post } from "~/lib/types";

export const loader: LoaderFunction = async ({
  context,
}): Promise<Post[] | undefined> => {
  const SANITY_PROJECT_ID = getEnv("SANITY_PROJECT_ID", context);
  if (!SANITY_PROJECT_ID) {
    return;
  }

  const client = createSanityClient({ projectId: SANITY_PROJECT_ID });
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
