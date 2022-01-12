import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getAllPosts } from "~/lib/client";
import type { Post } from "~/lib/types";
import PostPreview from "~/components/PostPreview";

export const loader: LoaderFunction = () => {
  return getAllPosts();
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
