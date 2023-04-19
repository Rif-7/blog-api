import { Link } from "react-router-dom";

function Navbar(props) {
  const { user, setUser } = props;

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser("");
  };

  const renderedList = user ? (
    <>
      <li>
        <Link to="/blog-api-client" className="username">
          Signed in as {user}
        </Link>
      </li>
      <li>
        <Link to="/blog-api-client/new-post">New Post</Link>
      </li>
      <li>
        <Link to="/blog-api-client" onClick={logoutUser}>
          Logout
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/blog-api-client/login">Login</Link>
      </li>
      <li>
        <Link to="/blog-api-client/sign-up">Sign Up</Link>
      </li>
    </>
  );

  return (
    <nav>
      <Link to="/blog-api-client" className="header">
        Personal Blog's Admin Page
      </Link>
      <ul className="nav-links">{renderedList}</ul>
    </nav>
  );
}

export default Navbar;
