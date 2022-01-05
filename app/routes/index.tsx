import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import createSanityClient from "~/lib/client";
import { indexQuery } from "~/lib/queries";

type Post = {
  title: string;
  slug: string;
};

export const loader: LoaderFunction = ({ context }): Promise<Post[]> => {
  const client = createSanityClient({ projectId: context.SANITY_PROJECT_ID });
  return client.fetch(indexQuery);
};

export default function Index() {
  const posts: Post[] = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <Link to={`posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
