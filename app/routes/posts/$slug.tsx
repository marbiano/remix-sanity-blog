import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import BlockContent from "@sanity/block-content-to-react";
import { postBySlugQuery } from "~/lib/queries";
import createSanityClient, { getImageUrlBuilder } from "~/lib/client";
import PostHeader from "~/components/PostHeader";
import { Post } from "~/lib/types";
import PostCover from "~/components/PostCover";

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

export default function PostSlug() {
  const post: Post = useLoaderData();
  console.log(post);
  return (
    <article>
      <PostHeader {...post} />
      {post.coverImage && <PostCover coverImage={post.coverImage} />}
      <section className="prose prose-zinc lg:prose-lg mx-auto my-16">
        <BlockContent blocks={post.body} />
      </section>
    </article>
  );
}
