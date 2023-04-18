import { Navigate, useParams } from "react-router-dom";
import {
  getSinglePost,
  getPostComments,
  postComment,
  deleteComment,
  updatePostStatus,
  deletePost,
} from "../helpers";
import { useEffect, useState } from "react";

function Post(props) {
  const { postId } = useParams();
  const { user } = props;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    getPostsAndComments();
  }, []);

  const getPostsAndComments = async () => {
    await getSinglePost(setPost, postId);
    await getPostComments(setComments, postId);
  };

  const onUpdatePost = async (e) => {
    e.target.disabled = true;
    setPost({});
    const res = await updatePostStatus(setPost, postId);
    if (!res.error) {
      getPostsAndComments();
    }
    e.target.disabled = false;
  };

  const onDeletePost = async (e) => {
    e.target.disabled = true;
    const res = await deletePost(postId);
    if (res.error) {
      alert(res.error);
    } else {
      setIsDeleted(true);
    }
    e.target.disabled = false;
  };

  if (!post) {
    return <div className="post-container">Loading...</div>;
  }

  if (post.error) {
    return <div className="post-container">{post.error.message}</div>;
  }

  if (isDeleted) {
    return <Navigate replace to="/blog-api" />;
  }

  return (
    <div className="post-container">
      <div className="top-group">
        <div className="title">{post.title}</div>
        <div className="timestamp">{post.time_formatted}</div>
      </div>
      <div className="button-group">
        <button className="status" onClick={onUpdatePost}>
          {post.isPublished ? "Unpublish Post" : "Publish Post"}
        </button>
        <button className="delete-post" onClick={onDeletePost}>
          Delete Post
        </button>
      </div>

      <div className="content">{post.content}</div>
      <Comments
        comments={comments}
        user={user}
        postId={postId}
        setComments={setComments}
      ></Comments>
    </div>
  );
}

function Comments(props) {
  const { comments, user, postId, setComments } = props;
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    if (content.length === 0) {
      return alert("Comment can't be empty");
    }
    setIsSubmitting(true);
    const tempContent = content;
    setContent("");
    const res = await postComment(tempContent, postId);
    if (res.error) {
      alert(res.error.message);
    }
    setIsSubmitting(false);
    getPostComments(setComments, postId);
  };

  const onCommentDelete = async (e, commentId) => {
    e.target.disabled = true;
    const res = await deleteComment(postId, commentId);
    e.target.disabled = false;
    if (res.error) {
      alert(res.error.message);
    } else {
      getPostComments(setComments, postId);
    }
  };

  return (
    <div className="comment-field">
      <div className="header">Comments: </div>
      {user ? (
        <form
          disabled={isSubmitting}
          className="comment-form"
          onSubmit={onCommentSubmit}
        >
          <input
            id="comment-field"
            name="comment"
            type="text"
            minLength="1"
            onChange={updateContent}
            value={content}
            placeholder="Your comment"
          ></input>
          <button disabled={isSubmitting}>Submit</button>
        </form>
      ) : null}

      {comments.length === 0 ? (
        <div></div>
      ) : (
        <div className="comments">
          {comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              onCommentDelete={onCommentDelete}
            ></Comment>
          ))}
        </div>
      )}
    </div>
  );
}

function Comment(props) {
  const { onCommentDelete } = props;
  const { user, content, time_formatted, id } = props.comment;

  const onDelete = (e) => {
    onCommentDelete(e, id);
  };

  return (
    <div className="comment">
      <div>
        <span className="username">
          {"=> "}
          {user.username},
        </span>
        <span className="timestamp">{time_formatted}</span>
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
      <div className="text">{content}</div>
    </div>
  );
}

export default Post;
