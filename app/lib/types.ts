type Author = {
  name: string;
  image: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  author: Author;
  coverImage: string;
  publishedAt: string;
  intro: string;
  body: unknown;
};
