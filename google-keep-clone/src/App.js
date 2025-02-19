import React, { useState, useEffect } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Login from "./components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await signOut(auth);
      setUser(null);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <AppBar position="static" sx={{ backgroundColor: "#FFBF00" }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Keep Clone
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <AddNote userId={user.uid} />
            <Notes userId={user.uid} />
          </Container>
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
