import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Container } from "@mui/material";

const App = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // ✅ Dark Mode State

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

  // ✅ Toggle Theme Function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // ✅ Create MUI Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {user ? (
          <>
            <NavBar user={user} handleLogout={handleLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Container sx={{ mt: 4 }}>
              <AddNote userId={user.uid} />
              <Notes userId={user.uid} />
            </Container>
          </>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;


