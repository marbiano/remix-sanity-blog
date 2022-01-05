import { Post } from "~/lib/types";

type PostPreviewProps = Partial<Post>;

const PostPreview: React.FC<PostPreviewProps> = ({
  title,
  intro,
  coverImage,
}) => {
  return (
    <div>
      {coverImage && <img src={coverImage} />}
      <h1 className="text-2xl font-bold mt-8">{title}</h1>
      <p className="text-lg mt-4 text-slate-500">{intro}</p>
    </div>
  );
};

export default PostPreview;
