import { useParams } from "react-router-dom";
import { getSinglePost, getPostComments } from "../helpers";
import { useEffect, useState } from "react";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostsAndComments();
  }, [postId]);

  const getPostsAndComments = async () => {
    await getSinglePost(setPost, postId);
    await getPostComments(setComments, postId);
  };

  if (!post) {
    return <div className="post-container">Loading...</div>;
  }

  if (post.error) {
    return <div className="post-container">{post.error.message}</div>;
  }

  return (
    <div className="post-container">
      <div className="top-group">
        <div className="title">{post.title}</div>
        <div className="timestamp">{post.time_formatted}</div>
      </div>
      <div className="content">{post.content}</div>
      <Comments comments={comments}></Comments>
    </div>
  );
}

function Comments(props) {
  const { comments } = props;

  return (
    <div className="comment-field">
      <div className="header">Comments: </div>
      {comments.length === 0 ? (
        <div></div>
      ) : (
        <div className="comments">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id}></Comment>
          ))}
        </div>
      )}
    </div>
  );
}

function Comment(props) {
  const { user, content, time_formatted } = props.comment;

  return (
    <div className="comment">
      <div>
        <span className="username">
          {"=> "}
          {user.username},
        </span>
        <span className="timestamp">{time_formatted}</span>
      </div>
      <div className="text">{content}</div>
    </div>
  );
}

export default Post;
