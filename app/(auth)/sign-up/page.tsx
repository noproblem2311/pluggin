"use client";
import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields");
      return;
    }
    await auth.register({ email, password });
  };

  // const handleSignInWithGoogle = async () => {
  //   try {
  //     await signInWithGoogle();
  //     navigate("/"); // Redirect to home page after successful login
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
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email"
                name="email"
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
            Register
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
                onClick={() => router.push("/sign-in")}
              >
                Already have an account? Login
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box>
  );
};

export default RegisterPage;
