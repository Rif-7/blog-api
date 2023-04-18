import { useEffect, useState } from "react";
import { getPosts } from "../helpers";
import { Link } from "react-router-dom";

function Home(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  return (
    <div className="home">
      <div className="post-list">
        <div className="header">Posts: </div>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard post={post} key={post.id}></PostCard>)
        ) : (
          <div>Loading</div>
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
  const titleSlice = title.slice(0, title.length >= 25 ? 25 : title.length);

  return (
    <div className="post-card">
      <Link to={"/blog-api" + url} className="title">
        {titleSlice}
      </Link>
      <span className="content">{contentSlice}...</span>
      <span className="timestamp">{time_formatted}</span>
    </div>
  );
}

export default Home;
