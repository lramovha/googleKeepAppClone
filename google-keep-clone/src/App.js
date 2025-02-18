import React, { useState, useEffect } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Login from "./components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully!");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
      {user ? (
        <>
          {/* Navbar */}
          <nav className="bg-yellow-500 p-4 flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Keep Clone</h1>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </nav>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto mt-4 p-4">
            <AddNote userId={user.uid} />
            <Notes userId={user.uid} />
          </div>
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
