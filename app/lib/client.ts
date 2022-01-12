import Sanity from "picosanity";
import type { PicoSanity } from "picosanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Post, SanityConfig } from "~/lib/types";
import { allPostsQuery, postBySlugQuery } from "~/lib/queries";
import env from "~/lib/env";

const defaultConfig = {
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
};

function createSanityClient(config: SanityConfig) {
  return new Sanity(Object.assign({}, defaultConfig, config));
}

function getImageUrlBuilder(client: PicoSanity) {
  return imageUrlBuilder(client);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const SANITY_PROJECT_ID = env("SANITY_PROJECT_ID");

  if (!SANITY_PROJECT_ID) {
    return;
  }
  const client = createSanityClient({ projectId: SANITY_PROJECT_ID });
  const imgUrlBuilder = getImageUrlBuilder(client);

  const post = await client.fetch<Post>(postBySlugQuery, { slug });

  return {
    ...post,
    coverImage: imgUrlBuilder.image(post.coverImage).width(1200).url(),
  };
}

export async function getAllPosts(): Promise<Post[] | undefined> {
  const SANITY_PROJECT_ID = env("SANITY_PROJECT_ID");
  if (!SANITY_PROJECT_ID) {
    return;
  }
  const client = createSanityClient({ projectId: SANITY_PROJECT_ID });
  const imgUrlBuilder = getImageUrlBuilder(client);

  const posts: Post[] = await client.fetch(allPostsQuery);

  return posts.map((post) => ({
    ...post,
    coverImage: imgUrlBuilder.image(post.coverImage).width(600).url(),
  }));
}
