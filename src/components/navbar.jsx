import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Post Trauma
          </Typography>
        </Link>

        <Box ml="auto">
          {user ? (
            <Button
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Box display={"flex"}>
              <Link to={"/login"}>
                <Typography ml={2}>Login</Typography>
              </Link>

              <Link to={"/signup"}>
                <Typography ml={2}>Sign up</Typography>
              </Link>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
