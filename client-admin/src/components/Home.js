import { useEffect, useState } from "react";
import { getPublishedPosts, getUnpublishedPosts } from "../helpers";
import { Link, Navigate } from "react-router-dom";

function Home(props) {
  const { user } = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) getPublishedPosts(setPosts);
  }, []);

  if (!user) {
    return <Navigate replace to="/blog-api/login" />;
  }

  const onFilterChange = (e) => {
    setPosts([]);
    const value = e.target.value;
    if (value === "published") {
      getPublishedPosts(setPosts);
    } else {
      getUnpublishedPosts(setPosts);
    }
  };

  return (
    <div className="home">
      <div className="post-list">
        <div className="header">
          Posts:
          <select
            defaultChecked="published"
            className="filter"
            onChange={onFilterChange}
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard post={post} key={post.id}></PostCard>)
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
}

function PostCard(props) {
  const { title, time_formatted, url, content } = props.post;
  const contentSlice = content.slice(
    0,
    content.length >= 30 ? 30 : content.length
  );
  return (
    <div className="post-card">
      <Link to={"/blog-api" + url} className="title">
        {title}
      </Link>
      <span className="content">{contentSlice}...</span>
      <span className="timestamp">{time_formatted}</span>
    </div>
  );
}

export default Home;
