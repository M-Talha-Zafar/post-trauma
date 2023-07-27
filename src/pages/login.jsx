import { useRef } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      login(email, password);
      navigate("/");
    } catch (ex) {
      alert(ex.message);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          inputRef={emailRef}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          inputRef={passwordRef}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Typography textAlign={"end"} m={2}>
          Don't have an account?
          <span className="ms-2 underline">
            <Link to="/signup">Sign up</Link>
          </span>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
