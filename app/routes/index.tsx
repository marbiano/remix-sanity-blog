import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import createSanityClient, { getImageUrlBuilder } from "~/lib/client";
import { indexQuery } from "~/lib/queries";
import type { Post } from "~/lib/types";
import PostPreview from "~/components/PostPreview";

export const loader: LoaderFunction = async ({ context }): Promise<Post[]> => {
  const client = createSanityClient({ projectId: context.SANITY_PROJECT_ID });
  const imgUrlBuilder = getImageUrlBuilder(client);
  const posts: Post[] = await client.fetch(indexQuery);
  return posts.map((post) => ({
    ...post,
    coverImage: imgUrlBuilder.image(post.coverImage).width(600).url(),
  }));
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
