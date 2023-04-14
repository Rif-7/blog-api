const apiUrl = "http://localhost:4000";

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
    const res = await response.json();
    if (res.error) {
      console.log(res.error);
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { getPosts, getSinglePost, getPostComments, login, postComment };
