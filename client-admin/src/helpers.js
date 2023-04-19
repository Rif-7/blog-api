const apiUrl = "https://blog-api-production-e966.up.railway.app";

const createPost = async (title, content) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated");
      return;
    }

    const response = await fetch(apiUrl + "/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    let res;
    if (response === "Unauthorized") {
      res = { error: [{ msg: "User is not authorized to create posts" }] };
    } else {
      res = await response.json();
    }

    return res;
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated");
      return;
    }
    const url = apiUrl + "/posts/" + postId;
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const res = (await response).json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getPublishedPosts = async (setPosts) => {
  try {
    const response = await fetch(apiUrl + "/posts/", {
      method: "GET",
      mode: "cors",
    });
    const posts = await response.json();
    setPosts(posts);
  } catch (err) {
    console.log(err);
    return setPosts([]);
  }
};

const getUnpublishedPosts = async (setPosts) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("User not signed in");
    }
    const response = await fetch(apiUrl + "/posts/unpublished", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response !== "Unauthorized") {
      const posts = await response.json();
      setPosts(posts);
    }
  } catch (err) {
    console.log(err);
    return setPosts([]);
  }
};

const getSinglePost = async (setPost, id) => {
  try {
    const url = apiUrl + "/posts/" + id;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    const post = await response.json();
    setPost(post);
  } catch (err) {
    console.log(err);
  }
};

const updatePostStatus = async (setPost, id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated");
      return;
    }

    const url = apiUrl + "/posts/" + id;
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    let res;
    if (response === "Unauthorized") {
      res = { error: { message: "User if not authorized" } };
    } else {
      res = await response.json();
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getPostComments = async (setComments, id) => {
  try {
    const url = apiUrl + "/posts/" + id + "/comments";
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    const comments = await response.json();
    setComments(comments);
  } catch (err) {
    console.log(err);
  }
};

const login = async (username, password) => {
  try {
    const response = await fetch(apiUrl + "/login/admin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const res = await response.json();
    if (!res.error) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", username);
    }

    return res;
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (username, password) => {
  try {
    const response = await fetch(apiUrl + "/sign-up/admin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const res = await response.json();
    if (!res.error) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", username);
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

const postComment = async (content, id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User not logged in");
      return;
    }
    const url = apiUrl + "/posts/" + id + "/comments";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        content,
      }),
    });
    let res;
    if (response === "Unauthorized") {
      res = { error: { message: "User is unauthorized " } };
    } else {
      res = await response.json();
    }
    if (res.error) {
      console.log(res.error);
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("User not signed in");
    }
    const url = apiUrl + "/posts/" + postId + "/comments/" + commentId;
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    let res;
    if (response === "Unauthorized") {
      res = { error: { message: "User is not authenticated" } };
    } else {
      res = await response.json();
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export {
  createPost,
  deletePost,
  getPublishedPosts,
  getUnpublishedPosts,
  getSinglePost,
  updatePostStatus,
  getPostComments,
  login,
  postComment,
  deleteComment,
  signUp,
};
