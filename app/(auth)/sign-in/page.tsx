"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    await auth.login({ email, password });
  };

  // const handleSignInWithGoogle = async () => {
  //   try {
  //     await signInWithGoogle();
  //   } catch (error) {
  //     console.error("Error signing in with Google:", error);
  //   }
  // };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <div>
        <Typography
          textAlign="center"
          component="h1"
          variant="h5"
          sx={{ mb: 2 }}
        >
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          {/* <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignInWithGoogle}
            sx={{ mt: 2 }}
          >
            Sign in with Google
          </Button> */}
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Typography
                style={{ cursor: "pointer", textDecoration: "underline" }}
                textAlign="center"
                onClick={() => router.push("/sign-up")}
              >
                Don&apos;t have an account? Register
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box>
  );
};

export default LoginPage;
