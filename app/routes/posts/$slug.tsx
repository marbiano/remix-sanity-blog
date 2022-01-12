import { useLoaderData, json } from "remix";
import type { HeadersFunction, LoaderFunction } from "remix";
import type { Post } from "~/lib/types";
import { getPost } from "~/lib/client";
import getHeaders from "~/lib/get-headers";
import PostHeader from "~/components/PostHeader";
import PostContent from "~/components/PostContent";

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
