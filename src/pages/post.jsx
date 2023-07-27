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
  Tooltip,
  Button,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { randomId } from "../utilities/helperFunctions";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../contexts/useAuth";
import { truncateTitle } from "../utilities/helperFunctions";
import axios from "axios";
import ConfirmationModal from "../components/confirmationModal";

const Post = () => {
  const { id } = useParams();
  const posts = JSON.parse(localStorage.getItem("posts"));
  const [post, setPost] = useState(posts.find((post) => post.id == id));

  const commentRef = useRef();
  const { user } = useAuth();
  const [comments, setComments] = useState(
    () => JSON.parse(localStorage.getItem(`comments-${id}`)) || []
  );

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const [editCommentMode, setEditCommentMode] = useState(false);
  const [editedCommentBody, setEditedCommentBody] = useState();
  const [deleteEntity, setDeleteEntity] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const navigate = useNavigate();

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
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!post.custom && comments.length === 0) fetchComments();
  }, []);

  useEffect(() => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
  }, [comments]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostDelete = () => {
    let updatedPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/");
    handleClose();
  };

  const handleCommentDelete = () => {
    let updatedComments = comments.filter((comment) => comment.id !== deleteId);
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    handleClose();
  };

  const handlePostSave = () => {
    let editedPost = { ...post, title: editedTitle, body: editedBody };
    setPost(editedPost);
    let editedPosts = posts.map((post) => (post.id === id ? editedPost : post));
    localStorage.setItem("posts", JSON.stringify(editedPosts));
    setEditMode(false);
  };

  const handleCommentSave = (comment) => {
    const { id } = comment;
    let editedComment = { ...comment, body: editedCommentBody };
    let editedComments = comments.map((comment) =>
      comment.id === id ? editedComment : comment
    );
    setComments(editedComments);
    console.log(editedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(editedComments));
    setEditCommentMode(false);
  };

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

            {user.email === post.userEmail && (
              <Box ml="auto" display="flex">
                <Tooltip title="Delete" placement="top">
                  <DeleteIcon
                    color="secondary"
                    onClick={() => {
                      setDeleteEntity("post");
                      handleOpen();
                    }}
                    className="cursor-pointer"
                  />
                </Tooltip>

                <Tooltip title="Edit" placement="top">
                  <EditIcon
                    className="cursor-pointer"
                    onClick={() => setEditMode(true)}
                  />
                </Tooltip>
              </Box>
            )}
          </Box>
          <ConfirmationModal
            open={open}
            handleClose={handleClose}
            handleDelete={
              deleteEntity === "post" ? handlePostDelete : handleCommentDelete
            }
            entityTitle={deleteEntity}
          />
          <Box>
            {editMode ? (
              <TextField
                fullWidth
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                variant="outlined"
              />
            ) : (
              <Typography mb={2} variant="h4">
                {post.custom ? post.title : truncateTitle(post.title, 5)}
              </Typography>
            )}

            {editMode ? (
              <TextField
                fullWidth
                multiline
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                variant="outlined"
              />
            ) : (
              <Typography variant="subtitle1">{post.body}</Typography>
            )}

            {editMode && (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePostSave}
              >
                Save
              </Button>
            )}
          </Box>
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
                  {!editCommentMode ? (
                    <>
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
                      {user.email === post.userEmail && (
                        <Box ml="auto" display="flex">
                          <Tooltip title="Delete" placement="top">
                            <DeleteIcon
                              color="secondary"
                              onClick={() => {
                                setDeleteEntity("comment");
                                setDeleteId(comment.id);
                                handleOpen();
                              }}
                              className="cursor-pointer"
                            />
                          </Tooltip>

                          <Tooltip title="Edit" placement="top">
                            <EditIcon
                              className="cursor-pointer"
                              onClick={() => {
                                setEditedCommentBody(comment.body);
                                setEditCommentMode(true);
                              }}
                            />
                          </Tooltip>
                        </Box>
                      )}
                    </>
                  ) : (
                    <Box display="flex" width="100%">
                      <TextField
                        fullWidth
                        value={editedCommentBody}
                        onChange={(e) => setEditedCommentBody(e.target.value)}
                        variant="outlined"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleCommentSave(comment);
                        }}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
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
