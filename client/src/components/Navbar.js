import { Link } from "react-router-dom";

function Navbar(props) {
  const { user } = props;

  const renderedList = user ? (
    <>
      <li>Hello, {user}</li>
      <li>
        <Link to="/blog-api/logout">Logout</Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/blog-api/login">Login</Link>
      </li>
      <li>
        <Link to="/blog-api/sign-up">Sign Up</Link>
      </li>
    </>
  );

  return (
    <nav>
      <Link to="/blog-api" className="header">
        Personal Blog
      </Link>
      <ul className="nav-links">{renderedList}</ul>
    </nav>
  );
}

export default Navbar;
