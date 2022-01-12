import { HeadersFunction, useLoaderData, json } from "remix";
import type { LoaderFunction } from "remix";
import { getPost } from "~/lib/client";
import PostHeader from "~/components/PostHeader";
import type { Post } from "~/lib/types";
import PostContent from "~/components/PostContent";

function getHeaders(): Headers {
  const headers = new Headers();
  headers.set("Cache-Control", "public, max-age=0, s-maxage=3600");
  return headers;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<Response | undefined> => {
  if (!params.slug) {
    return;
  }

  const post = await getPost(params.slug);

  if (!post) {
    return;
  }

  return json<Post>(post, {
    headers: getHeaders(),
  });
};

export const headers: HeadersFunction = () => {
  // Only until loaderHeaders works properly again: https://github.com/remix-run/remix/issues/1140
  const headers = getHeaders();
  return headers;
};

export default function Post() {
  const post: Post = useLoaderData();

  return (
    <article>
      <PostHeader {...post} />
      <PostContent body={post.body} />
    </article>
  );
}
