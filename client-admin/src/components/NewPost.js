import { Navigate } from "react-router-dom";
import { useState } from "react";
import { createPost } from "../helpers";

function NewPost(props) {
  const { user } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postId, setPostId] = useState("");

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await createPost(title, content);
    if (res.error) {
      setError(res.error);
    } else {
      setPostId(res.id);
    }
    setIsSubmitting(false);
  };

  if (!user) {
    return <Navigate replace to="/blog-api/login" />;
  }

  if (postId) {
    return <Navigate replace to={"/blog-api/posts/" + postId} />;
  }

  return (
    <form
      className="form-field"
      onSubmit={onFormSubmit}
      disabled={isSubmitting}
    >
      <div className="header">New Post</div>
      <div className="form-group">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          name="title"
          minLength="2"
          type="text"
          placeholder="Hello world"
          value={title}
          onChange={updateTitle}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="content">Content: </label>
        <textarea
          id="content"
          className="content"
          name="content"
          minLength="6"
          rows="12"
          cols="75"
          value={content}
          onChange={updateContent}
        ></textarea>
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

export default NewPost;
