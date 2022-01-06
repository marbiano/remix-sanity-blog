import { HeadersFunction, useLoaderData, json } from "remix";
import type { LoaderFunction } from "remix";
import { postBySlugQuery } from "~/lib/queries";
import createSanityClient, { getImageUrlBuilder } from "~/lib/client";
import PostHeader from "~/components/PostHeader";
import { Post } from "~/lib/types";
import PostContent from "~/components/PostContent";

export const loader: LoaderFunction = async ({ params, context }) => {
  const client = createSanityClient({ projectId: context.SANITY_PROJECT_ID });
  const imgUrlBuilder = getImageUrlBuilder(client);
  const post: Post = await client.fetch(postBySlugQuery, { slug: params.slug });

  const headers = new Headers();
  headers.set("Cache-Control", "max-age=0, s-maxage=3600");

  return json<Post>(
    {
      ...post,
      coverImage: imgUrlBuilder.image(post.coverImage).width(1200).url(),
    },
    {
      headers,
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const headers = new Headers();
  const cacheControl = loaderHeaders.get("Cache-Control");
  if (cacheControl) {
    headers.set("Cache-Control", cacheControl);
  }
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
