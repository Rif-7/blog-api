import { useState } from "react";
import { signUp } from "../helpers";
import { Navigate } from "react-router-dom";

function SignUp(props) {
  const { setUser, user } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const submitForm = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setError([{ msg: "Passwords do not match" }]);
      return;
    }

    setIsSubmitting(true);
    const res = await signUp(username, password);
    if (res.error) {
      setError(res.error);
    } else {
      setUser(username);
    }
    setIsSubmitting(false);
  };

  if (user) {
    return <Navigate replace to="/blog-api" />;
  }

  return (
    <form className="login-field" onSubmit={submitForm} disabled={isSubmitting}>
      <div className="header">Sign Up</div>
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
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password: </label>
        <input
          id="confirm-password"
          name="confirm-password"
          minLength="6"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={updateConfirmPassword}
        ></input>
      </div>
      <button disabled={isSubmitting}>Submit</button>
      {error.length > 0
        ? error.map((error, index) => (
            <li key={index} className="error-item">
              {error.msg}
            </li>
          ))
        : null}
    </form>
  );
}

export default SignUp;
