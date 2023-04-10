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

export { getPosts, getSinglePost };
