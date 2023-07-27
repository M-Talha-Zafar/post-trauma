import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box mt={10} textAlign={"center"}>
      <Typography mb={2} variant="h2">
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1">
        The page you are looking for does not exist
      </Typography>
    </Box>
  );
};

export default NotFound;
