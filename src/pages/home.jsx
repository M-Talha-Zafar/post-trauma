import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PostCard from "../components/postcard";
import { useAuth } from "../contexts/useAuth";
import { randomId } from "../utilities/helperFunctions";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState(
    () => JSON.parse(localStorage.getItem("posts")) || []
  );
  const titleRef = useRef();
  const bodyRef = useRef();
  const { user } = useAuth();

  const fetchPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  };

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let post = {
      id: randomId(),
      userEmail: user.email,
      username: user.name,
      title: titleRef.current.value,
      body: bodyRef.current.value,
      custom: true,
    };

    setPosts((prevState) => [post, ...prevState]);

    titleRef.current.value = "";
    bodyRef.current.value = "";
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <form onSubmit={handleFormSubmit}>
            <Typography variant="h4" mb={2}>
              What's on your mind? <br /> Let others know!
            </Typography>
            <TextField
              inputRef={titleRef}
              label="Title"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              inputRef={bodyRef}
              label="Body"
              type="text"
              rows={4}
              multiline
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              Post
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box sx={{ maxHeight: "80vh", overflowX: "auto" }}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                username={post.username || "John Doe"}
                title={post.title}
                body={post.body}
                custom={post.custom}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
