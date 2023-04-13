import { useState } from "react";
import { login } from "../helpers";
import { Navigate } from "react-router-dom";

function Login(props) {
  const { setUser, user } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await login(username, password);
    if (res.error) {
      return setError(res.error);
    }
    setUser(username);
  };

  if (user) {
    return <Navigate replace to="/blog-api" />;
  }

  return (
    <form className="login-field" onSubmit={submitForm}>
      <div className="header">Login</div>
      <div className="form-group">
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          minLength="3"
          type="text"
          placeholder="Bob123"
          value={username}
          onChange={updateUsername}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          minLength="6"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={updatePassword}
        ></input>
      </div>
      <button>Submit</button>
      {error.message ? <li className="error-item">{error.message}</li> : null}
    </form>
  );
}

export default Login;
