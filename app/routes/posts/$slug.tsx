import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { postBySlugQuery } from "~/lib/queries";
import createSanityClient, { getImageUrlBuilder } from "~/lib/client";
import PostHeader from "~/components/PostHeader";
import { Post } from "~/lib/types";
import PostContent from "~/components/PostContent";

export const loader: LoaderFunction = async ({
  params,
  context,
}): Promise<Post> => {
  const client = createSanityClient({ projectId: context.SANITY_PROJECT_ID });
  const imgUrlBuilder = getImageUrlBuilder(client);
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });
  return {
    ...post,
    coverImage: imgUrlBuilder.image(post.coverImage).width(1200).url(),
  };
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
