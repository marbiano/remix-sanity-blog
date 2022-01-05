import { NavLink } from "remix";
import cx from "classnames";
import { Post } from "~/lib/types";

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul className="md:container md:mx-auto flex mt-8 text-sm divide-x">
      {posts.map((post) => (
        <li key={post.slug} className="px-4">
          <NavLink
            to={post.slug}
            className={({ isActive }) =>
              cx("text-slate-600", !isActive && "underline")
            }
          >
            {post.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
