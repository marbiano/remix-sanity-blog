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

export type SanityConfig = {
  projectId: string;
  dataset?: string;
  apiVersion?: string;
  token?: string;
  useCdn?: boolean;
  withCredentials?: boolean;
};

export type SerializerCodeProps = {
  node: {
    _type: "code";
    language: string;
    code: string;
  };
};
