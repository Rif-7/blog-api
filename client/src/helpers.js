const apiUrl = "https://blog-api-production-e966.up.railway.app";

const getPosts = async (setPosts) => {
  try {
    const response = await fetch(apiUrl + "/posts", {
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
    const response = await fetch(apiUrl + "/login", {
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
    const response = await fetch(apiUrl + "/sign-up", {
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
  getPosts,
  getSinglePost,
  getPostComments,
  login,
  postComment,
  deleteComment,
  signUp,
};
