import { Post } from "~/lib/types";

type PostHeaderProps = Partial<Post>;

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  intro,
  author,
  publishedAt,
}) => {
  return (
    <section className="md:container md:mx-auto text-center">
      <h1 className="text-7xl font-bold">{title}</h1>
      <p className="text-xl mt-8 max-w-prose mx-auto text-slate-600">{intro}</p>
      <div className="flex gap-x-8 justify-center mt-12 text-sm">
        <span>
          <span className="block text-slate-500">Author</span> {author?.name}
        </span>
        {publishedAt && (
          <span>
            <span className="block text-slate-500">Date</span>{" "}
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </section>
  );
};

export default PostHeader;
