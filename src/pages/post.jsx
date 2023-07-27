import {
  List,
  ListItem,
  Avatar,
  Typography,
  ListItemText,
  ListItemAvatar,
  Box,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { randomId } from "../utilities/helperFunctions";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../contexts/useAuth";
import { truncateTitle } from "../utilities/helperFunctions";
import axios from "axios";

const Post = () => {
  const { id } = useParams();
  const commentRef = useRef();
  const { user } = useAuth();
  const [comments, setComments] = useState(
    () => JSON.parse(localStorage.getItem(`comments-${id}`)) || []
  );
  const post = JSON.parse(localStorage.getItem("posts")).find(
    (post) => post.id == id
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    let comment = {
      id: randomId(),
      username: user.name,
      postId: post.id,
      body: commentRef.current.value,
      custom: true,
    };

    setComments((prevComments) => [...prevComments, comment]);
    commentRef.current.value = "";
  };

  const fetchComments = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((json) => setComments(json));
  };

  useEffect(() => {
    if (!post.custom && comments.length === 0) fetchComments();
  }, []);

  useEffect(() => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
  }, [comments]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      pb={5}
    >
      <Box
        width="50%"
        className="rounded-lg p-10 mt-10"
        sx={{ background: "#1E1E1E" }}
      >
        <Box className="p-5 mb-2">
          <Box display="flex">
            <Avatar
              sx={{
                width: 64,
                height: 64,
              }}
              className="me-3"
            >
              {post.username ? post.username[0] : "J"}
            </Avatar>
            <Typography mb={5} variant="h3">
              {post.username ? post.username : "John Doe"}
            </Typography>
          </Box>
          <Typography mb={2} variant="h4">
            {post.custom ? post.title : truncateTitle(post.title, 5)}
          </Typography>
          <Typography variant="subtitle1"> {post.body}</Typography>
        </Box>
        <Divider />
        <Box textAlign={"center"} p={5}>
          {comments.length > 0 ? (
            <List sx={{ maxHeight: "50vh", overflowX: "auto" }}>
              {comments.map((comment) => (
                <ListItem
                  key={comment.id}
                  className="rounded-lg mb-2"
                  sx={{ background: "#1A1A1A" }}
                >
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography color={"cyan"}>
                        {comment.custom
                          ? comment.username
                          : comment.email.split("@")[0]}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="subtitle2">
                        {comment.body}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="h4"> No comments </Typography>
          )}
        </Box>
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <TextField
            inputRef={commentRef}
            label="Comment"
            type="text"
            helperText="Press Enter to post"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <IconButton
            type="submit"
            style={{ fontSize: 34 }}
            aria-label="send"
            color="primary"
          >
            <SendIcon fontSize="24" />
          </IconButton>
        </form>
      </Box>
    </Box>
  );
};

export default Post;
