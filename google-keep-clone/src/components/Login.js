import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const Login = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to sign in. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #ff9a9e, #fad0c4)", // Gradient background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card sx={{ p: 4, textAlign: "center", maxWidth: 400, boxShadow: 6, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="#333" gutterBottom>
            Keep Clone
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            Sign in to access your notes securely.
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{
              width: "100%",
              py: 1.5,
              backgroundColor: "#4285F4",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#357ae8" },
              borderRadius: "20px", // Rounded button
            }}
            startIcon={<GoogleIcon />}
            onClick={signIn}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign in with Google"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

