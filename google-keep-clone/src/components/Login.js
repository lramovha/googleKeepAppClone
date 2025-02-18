import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";

const Login = ({ setUser }) => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Welcome to Your Notes App</h2>
        <button onClick={signIn} className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
