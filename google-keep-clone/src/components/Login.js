import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"; // Google Icon for the button

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card sx={{ p: 4, textAlign: "center", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Google keep Notes App clone
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Sign in to access your notes securely.
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<GoogleIcon />} 
            onClick={signIn} 
            disabled={loading}
            sx={{ width: "100%", py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign in with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
