import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="px-4 py-3 border">
      <h1 className="text-5xl ml-5 font-bold text-blue-700 cursor-pointer select-none">
        <Link to="/login">Jobs App</Link>
      </h1>
    </header>
  );
};

export default Header;
