import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  deepOrange,
  deepPurple,
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  lime,
  green,
} from "@mui/material/colors";
import { truncateTitle } from "../utilities/helperFunctions";

const colors = [
  deepOrange,
  deepPurple,
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  lime,
  green,
];

const PostCard = ({ id, username, title, body, custom }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/post/${id}`)}
      className="shadow-lg rounded-lg p-6 m-4 cursor-pointer"
    >
      <CardContent>
        <Typography variant="h4" mb={2}>
          {custom ? title : truncateTitle(title, 5)}
        </Typography>
        <Box display="flex" mb={2}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: colors[Math.floor(Math.random() * (9 + 1))][500],
            }}
            className="me-3"
          >
            {username[0]}
          </Avatar>
          <Typography variant="h6" color={"secondary"}>
            {username}
          </Typography>
        </Box>
        <Typography variant="subtitle1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
