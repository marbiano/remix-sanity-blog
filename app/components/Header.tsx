import { Link } from "remix";

const Header: React.FC = () => {
  return (
    <header className="md:container md:mx-auto border-b-4 border-slate-200 py-8">
      <h2 className="text-slate-400 text-xl font-bold">
        <Link to="/">Remix Blog</Link>
      </h2>
    </header>
  );
};

export default Header;
