import { HeadersFunction, useLoaderData, json } from "remix";
import type { LoaderFunction } from "remix";
import { postBySlugQuery } from "~/lib/queries";
import createSanityClient, { getImageUrlBuilder } from "~/lib/client";
import PostHeader from "~/components/PostHeader";
import { Post } from "~/lib/types";
import PostContent from "~/components/PostContent";
import getEnv from "~/lib/get-env";

function getHeaders(): Headers {
  const headers = new Headers();
  headers.set("Cache-Control", "max-age=0, s-maxage=3600");
  return headers;
}

export const loader: LoaderFunction = async ({
  params,
  context,
}): Promise<Response | undefined> => {
  const SANITY_PROJECT_ID = getEnv("SANITY_PROJECT_ID", context);
  if (!SANITY_PROJECT_ID) {
    return;
  }

  const client = createSanityClient({ projectId: SANITY_PROJECT_ID });
  const imgUrlBuilder = getImageUrlBuilder(client);
  const post = await client.fetch<Post>(postBySlugQuery, { slug: params.slug });

  return json<Post>(
    {
      ...post,
      coverImage: imgUrlBuilder.image(post.coverImage).width(1200).url(),
    },
    {
      headers: getHeaders(),
    }
  );
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
