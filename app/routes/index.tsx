import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import createSanityClient, { getImageUrlBuilder } from "~/lib/client";
import { indexQuery } from "~/lib/queries";
import type { Post } from "~/lib/types";
import PostPreview from "~/components/PostPreview";
import getEnv from "~/lib/get-env";

export const loader: LoaderFunction = async ({
  context,
}): Promise<Post[] | undefined> => {
  const SANITY_PROJECT_ID = getEnv("SANITY_PROJECT_ID", context);
  if (!SANITY_PROJECT_ID) {
    return;
  }

  const client = createSanityClient({
    projectId: SANITY_PROJECT_ID,
  });
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
