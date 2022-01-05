import { Post } from "~/lib/types";

type PostCoverProps = Partial<Post>;

const PostCover: React.FC<PostCoverProps> = ({ coverImage }) => {
  return <img src={coverImage} className="mx-auto mt-8" />;
};

export default PostCover;
