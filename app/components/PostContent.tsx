import BlockContent from "@sanity/block-content-to-react";
import { Post } from "~/lib/types";

type PostContentProps = {
  body: Post["body"];
};
const PostContent: React.FC<PostContentProps> = ({ body }) => {
  return (
    <section className="prose prose-zinc lg:prose-lg mx-auto my-16">
      <BlockContent blocks={body} />
    </section>
  );
};

export default PostContent;
