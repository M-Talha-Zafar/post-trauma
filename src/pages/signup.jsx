import React, { useRef } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignUp = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      signUp({ name, email, password });
      navigate("/login");
    } catch (ex) {
      alert(ex.message);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          inputRef={nameRef}
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
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
          Sign Up
        </Button>
        <Typography textAlign={"end"} m={2}>
          Already have an account?
          <span className="ms-2 underline">
            <Link to="/login">Login</Link>
          </span>
        </Typography>
      </form>
    </Container>
  );
};

export default Signup;
