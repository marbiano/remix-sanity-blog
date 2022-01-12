import BlockContent from "@sanity/block-content-to-react";
import type { Post, SerializerCodeProps } from "~/lib/types";

type PostContentProps = {
  body: Post["body"];
};

const serializers = {
  types: {
    code: (props: SerializerCodeProps) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

const PostContent: React.FC<PostContentProps> = ({ body }) => {
  return (
    <section className="prose prose-zinc lg:prose-lg mx-auto my-16">
      <BlockContent
        blocks={body}
        serializers={serializers}
        imageOptions={{ fit: "max" }}
      />
    </section>
  );
};

export default PostContent;
