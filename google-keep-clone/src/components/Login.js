import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase";

const Login = ({ setUser }) => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Store user details
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={signIn} className="px-4 py-2 bg-blue-500 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
