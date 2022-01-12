import { json, Link, useLoaderData } from "remix";
import type { HeadersFunction, LoaderFunction } from "remix";
import type { Post } from "~/lib/types";
import { getAllPosts } from "~/lib/client";
import getHeaders from "~/lib/get-headers";
import PostPreview from "~/components/PostPreview";

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

export default function Index() {
  const posts: Post[] = useLoaderData();

  return (
    <div className="container mx-auto mt-24">
      <ul className="grid gap-8 grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`posts/${post.slug}`}>
              <PostPreview {...post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
